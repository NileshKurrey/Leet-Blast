import express from 'express'
import { userLoginValidator, userRegistrationValidator } from '../validator/index.js'
import  {validate}  from '../middlewares/validator.middleware.js'
import { login, registerUser } from '../controllers/User.controllers.js'

const UserRoutes = express.Router()

UserRoutes.post('/register',userRegistrationValidator(),validate, registerUser)
UserRoutes.post('/login',userLoginValidator(),validate,login)

export default UserRoutes