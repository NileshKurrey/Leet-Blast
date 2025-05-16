import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { userRegistrationValidator } from "../validator/index.js";
import { db } from "../libs/db.js";
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async(req, res)=>{
    //Intilally I will create only user registration and logged in leter on I will add a feature for email send
    const {name,email,image,password} = req.body
    console.log('hello')
    const existingUser = await db.user.findUnique({
        where: {
            email:email
        }
    })
    userRegistrationValidator()
    if(existingUser){
        return new ApiError(400, "User already exists",);
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await db.user.create({
        data: {
            name,
            email,
            image,
            password: hashedPassword
        }
    })
    return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
})

export {registerUser}