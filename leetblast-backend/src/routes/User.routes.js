import express from 'express'
import { userLoginValidator, userRegistrationValidator } from '../validator/index.js'
import  {validate}  from '../middlewares/validator.middleware.js'
import { login, refreshAccessToken, registerUser, resendVerficationToken, verifyUser } from '../controllers/User.controllers.js'

const UserRoutes = express.Router()

UserRoutes.post('/register',userRegistrationValidator(),validate, registerUser)
UserRoutes.get('/verify/:token',verifyUser)
UserRoutes.post('/resendVerificationEmail',userLoginValidator(),validate,resendVerficationToken)
UserRoutes.post('/login',userLoginValidator(),validate,login)
UserRoutes.post('/refreshAccesstoken',userLoginValidator(),validate,refreshAccessToken)

export default UserRoutes