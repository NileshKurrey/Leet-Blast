import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async(req, res)=>{
    //Intilally I will create only user registration and logged in leter on I will add a feature for email send
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

export {registerUser}