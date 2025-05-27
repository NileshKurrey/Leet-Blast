import express from 'express'
import { PasswordChangeValidator, userLoginValidator, userRegistrationValidator } from '../validator/index.js'
import  {validate}  from '../middlewares/validator.middleware.js'
import { forgotPassword, getUser, login, logout, refreshAccessToken, registerUser, resendVerficationToken, resetPassword, verifyUser, verifyYourEmailForNewPassword } from '../controllers/User.controllers.js'
import { isUserLoggedIn } from '../middlewares/UserValidator.middleware.js'



const UserRoutes = express.Router()

UserRoutes.post('/register',userRegistrationValidator(),validate, registerUser)
UserRoutes.get('/verify/:token',verifyUser)
UserRoutes.post('/resendVerificationEmail',userLoginValidator(),validate,resendVerficationToken)
UserRoutes.post('/login',userLoginValidator(),validate,login)
UserRoutes.put('/refreshAccesstoken',userLoginValidator(),validate,refreshAccessToken)
UserRoutes.post('/logout',isUserLoggedIn, logout)
UserRoutes.post('/forgetPassword', forgotPassword)
UserRoutes.put('/resetPassword/:forgotPasswordToken',isUserLoggedIn,PasswordChangeValidator(),validate, resetPassword)
UserRoutes.get('/forgot-password-verification/:forgotPasswordToken', verifyYourEmailForNewPassword)
UserRoutes.get('/getUserProfile',isUserLoggedIn  ,getUser)

export default UserRoutes