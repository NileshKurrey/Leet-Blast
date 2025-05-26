import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";
import bcrypt from 'bcrypt'
import SendToken from "../libs/sendToken.js";

//register User
const registerUser = asyncHandler(async(req, res)=>{
   
    const { name,email,image, password } = req.body
    const existingUser = await db.user.findUnique({
        where: {
            email:email
        }
    })
    if(existingUser){
        res.status(400).json(new ApiResponse(400,"User already exists"));
        throw new ApiError(400, "User already exists",);
    }
    const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(password, salt);
   
    const user = await db.user.create({
        data: {
            name,
            email,
            image,
            password: hashedPassword
        }
    })

    res.status(201).json(new ApiResponse(201,user,"User created successfully"));
})
//verify User
//login user
const login = asyncHandler(async(req, res)=>{
    const {email,password} = req.body
    const user = await db.user.findUnique({
        where: {
            email:email
        }
    })
    if(!user){
        res.status(400).json(new ApiResponse(400,"User not found"));
        throw new ApiError(400, "User not found",);
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        res.status(400).json(new ApiResponse(400,"Password is incorrect"));
        throw new ApiError(400, "Password is incorrect",);
    }
    SendToken(user,200,res)
})
export {registerUser,login}

//forget Password

//reset Password


//update Profile


//resend verification email

//delete account
//Admin Controllers

//get all users
//get user by id
//update user by id
//make user admin
//delete user by id
