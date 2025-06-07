import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js"
import { db } from "../libs/db.js";
import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";

export const executeCode = asyncHandler(async (req, res) => {
  console.log("Bodys: ", req.body);

  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;


  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    return res.status(400).json(
      new ApiError(400, "Invalid or missing test cases!", {
        error: "Invalid or missing test cases!",
      }),
    );
  }

  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
    // based64_encoded:false,
    // wait:false,
  }));
  console.log("Submissions : ", submissions);

  
  const submitResponse = await submitBatch(submissions);
  console.log("SubmitResponse : ", submitResponse);

  // we get token from judge0
  const tokens = submitResponse.map((res) => res.token);
  console.log("Tokens :", tokens);

  // Step4. Poll judge0 ko for the result for all submited test-cases
  const results = await pollBatchResults(tokens);
  console.log("Results :", results);

  let allPassed = true;
  const detailsResults = results.map((result, i) => {
    const stdout = result.stdout?.trim();
    const expected_output = expected_outputs[i]?.trim();
    const passed = stdout === expected_output;

    console.log(`TestCase #${i + 1}`);
    console.log(`Input ${stdin[i]}`);
    console.log(`Expected Output for testcase ${expected_output}`);
    console.log(`Actual output  ${stdout}`);
    console.log(`Matched : ${passed}`);

    if (!passed) allPassed = false;

    return {
      testCase: i + 1,
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      compileOutput: result.compileOutput || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory}KB` : undefined,
      time: result.time ? `${result.time}s` : undefined,
    };
  });
  console.log("Deatils Output :", detailsResults);


  const problemExists = await db.problem.findUnique({
    where: { id: problemId },
  });
  if (!problemExists) {
    throw new ApiError(`❌ Problem with id "${problemId}" does not exist in DB`);
  }


  const submission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailsResults.map((r) => r.stdout)),
      stderr: detailsResults.some((r) => r.stderr)
        ? JSON.stringify(detailsResults.map((r) => r.stderr))
        : null,
      compileOutput: detailsResults.some((r) => r.compileOutput)
        ? JSON.stringify(
            detailsResults.compileOutput.map((r) => r.compileOutput),
          )
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailsResults.some((r) => r.memory)
        ? JSON.stringify(detailsResults.map((r) => r.memory))
        : null,
      time: detailsResults.some((r) => r.time)
        ? JSON.stringify(detailsResults.map((r) => r.time))
        : null,
    },
  });

  if (allPassed) {
 await db.problemSolved.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }


  const testCaseResults = detailsResults.map((result) => ({
    submissionId: submission.id,
    testCase: result.testCase,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compileOutput,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));


  await db.testCaseResult.createMany({
    data: testCaseResults,
  });

  const submissionWithTestCase = await db.submission.findUnique({
    where: { id: submission.id },
    include: { testCases: true },
  });

  res.status(200).json(
    new ApiResponse(200, "Code Executed successfully!", {
      submission: submissionWithTestCase,
    }),
  );

});