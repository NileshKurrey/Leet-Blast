import express from 'express'
import { userRegistrationValidator } from '../validator/index.js'
import  {validate}  from '../middlewares/validator.middleware.js'
import { registerUser } from '../controllers/User.controllers.js'

const UserRoutes = express.Router()

UserRoutes.post('/register',userRegistrationValidator(),validate, registerUser)
// UserRoutes.post('/login')

export default UserRoutes