import express from 'express'
import { isUserLoggedIn } from '../middlewares/UserValidator.middleware.js';
import { executeCode } from '../controllers/ExecuteCode.controller.js';

const executionRoute = express.Router();

executionRoute.post("",isUserLoggedIn,executeCode)

export default executionRoute;