import express from 'express'
import { userRegistrationValidator } from '../validator'
import { validate } from '../middlewares/validator.middlewre'

const authRoutes = express.Router()

authRoutes.route('/register').post(userRegistrationValidator(),validate)
authRoutes.route('/login')