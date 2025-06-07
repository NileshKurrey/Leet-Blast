import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";
// import { Difficulty } from "../generated/prisma/index.js";
import { db } from "../libs/db.js";

export const createProblem = asyncHandler((async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        testcases,
        constraints,
        hints,
        referenceSolutions,
        codeSnippets,
        editorial
    } = req.body

    // going to check the user role once again
    if (req.user.role !== "ADMIN") {
        return res
            .status(403)
            .json(
                new ApiError(
                    400,
                    "You are not allowed to create a problem , only a admin create a problem!",
                ),
            );
    }

    if (!title || !description || !difficulty || !testcases || !constraints || !tags || !examples || !hints || !referenceSolutions || !codeSnippets ) {
       
        return res.status(400).json(new ApiResponse(400,'', "All fields are required!"));
    }
    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language)
            if (!language) {
                return res.status(400).json(new ApiError(400, `Language ${language} is not supported`));
            }
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            }))
            const submissionResult = await submitBatch(submissions);
            const tokens = submissionResult.map((res) => res.token);
            const results = await pollBatchResults(tokens)
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result-----", result);
                console.log(
                  `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
                );
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`,
                    });
                }
            }
        }
        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty:difficulty.toUpperCase(),
                testcases,
                constraints,
                tags,
                examples,
                hints,
                referenceSolutions,
                codeSnippets,
                editorial,
                userId: req.user.id
            },
        });
        res.status(201).json(new ApiResponse(201,{newProblem},'Problem created successfully!'));
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, error.message));
    }

}))

export const getAllProblems = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    include: {
      solvedBy: {
        where: {
          userId: req.user.id,
        },
      },
    }
  }); 

  if (!problems) {
    return res.status(400).json(new ApiError(400, "No problem found!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, problems,"Problems fetched successfully!",));
});

export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id: id },
  });
  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Problem found successfully!", problem));
});

export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {
  const problems = await db.problem.findMany({
    where:{
      solvedBy:{
        some:{
          userId:req.user.id
        }
      }
    },
    include:{
      solvedBy:{
        where:{
          userId:req.user.id
        }
      }
    }
  })

  res.status(200).json(
    new ApiResponse(200,problems,"Solved problems fetched successfully!",)
  )

});

export const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id },
  });

  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

  // ✅ Check if user is ADMIN
  if (req.user.role !== "ADMIN") {
    return res.status(403).json(
      new ApiError(
        403,
        "You are not allowed to update a problem. Only admins can perform this action!"
      )
    );
  }

  // ✅ Check if this admin is the creator
  if (problem.userId !== req.user.id) {
    return res.status(403).json(
      new ApiError(
        403,
        "You can only update problems created by you."
      )
    );
  }

  const {
    title,
        description,
        difficulty,
        tags,
        examples,
        testcases,
        constraints,
        hints,
        referenceSolutions,
        codeSnippets,
        editorial
  } = req.body;

  
  for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
    const languageId = getJudge0LanguageId(language);
    if (!languageId) {
      return res.status(400).json(
        new ApiError(400, `Language ${language} is not supported`)
      );
    }

    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResults = await submitBatch(submissions);
    const tokens = submissionResults.map((res) => res.token);
    const results = await pollBatchResults(tokens);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result.status.id !== 3) {
        return res.status(400).json({
          error: `Testcase ${i + 1} failed for language ${language}`,
        });
      }
    }
  }

  const newProblem = await db.problem.update({
    where: { id },
    data: {
      title,
      description,
      difficulty:difficulty.toUpperCase(),
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
      hints,
      editorial,
      userId: req.user.id, 
    },
  });

  return res.status(200).json(
    new ApiResponse(200, newProblem, "Problem Updated Successfully",)
  );
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id: id },
  });
  if (!problem) {
    return res.status(404).json(new ApiError(404, "Problem not found!"));
  }

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiError(
          400,
          "You are not allowed to delete a problem , only a admin can delete a problem!",
        ),
      );
  }


  if (problem.userId !== req.user.id) {
    return res.status(403).json(
      new ApiError(
        403,
        "You can only delete problems created by you."
      )
    );
  }

  await db.problem.delete({
    where: { id },
  });

  return res.status(200)
    .json(
      new ApiResponse(204, '',"Problem Deleted Successfully")
    );

});