import express from 'express';
import { checkAdmin, isUserLoggedIn } from '../middlewares/UserValidator.middleware.js';
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from '../controllers/Problem.controller.js';


const ProblemRoutes = express.Router();
ProblemRoutes.post('/create-problem',isUserLoggedIn,checkAdmin,createProblem)
ProblemRoutes.get('/get-solved-problems',isUserLoggedIn,getAllProblemsSolvedByUser)
ProblemRoutes.get("/get-all-problems", isUserLoggedIn, getAllProblems);

ProblemRoutes.get("/get-problem/:id", isUserLoggedIn, getProblemById);

ProblemRoutes.put("/update-problem/:id", isUserLoggedIn, checkAdmin, updateProblem);

ProblemRoutes.delete("/delete-problem/:id", isUserLoggedIn, checkAdmin, deleteProblem);


export default ProblemRoutes;