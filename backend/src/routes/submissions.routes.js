import express from "express"

import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submissions.controller.js";
import { isUserLoggedIn } from "../middlewares/UserValidator.middleware.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions",isUserLoggedIn,getAllSubmission)
submissionRoutes.get("/get-submission/:problemId",isUserLoggedIn,getSubmissionsForProblem)
submissionRoutes.get("/get-submissions-count/:problemId",isUserLoggedIn,getAllTheSubmissionsForProblem)


export default submissionRoutes