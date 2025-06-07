import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";


export const getAllSubmission = asyncHandler(async(req,res)=>{

    const userId = req.user.id;
    if(!userId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: User ID not found")
        )
    }

    const submissions = await db.submission.findMany({
        where:{userId:userId}
    })

    res.status(200).json(
        new ApiResponse(200,submissions ?? [],"Submissions fetched successfully!")
    )

})


export const getSubmissionsForProblem = asyncHandler(async(req,res)=>{

    const userId = req.user.id;
    if(!userId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: User ID not found")
        )
    }

    const problemId = req.params.problemId;
    if(!problemId){
        return res.status(400).json(
            new ApiError(400,"Unauthorized: Problem not found")
        )
    }

    const submissions = await db.submission.findMany({
        where:{
            userId:userId,
            problemId:problemId,
        }
    })

    res.status(200).json(
        new ApiResponse(200,submissions ?? [],"Submissions fetched successfully")
    )

})


export const getAllTheSubmissionsForProblem = asyncHandler(async(req,res)=>{

    const problemId = req.params.problemId;

    const submissions = await db.submission.count({
        where:{problemId:problemId}
    })

     res.status(200).json(
        new ApiResponse(200,{
            count:submissions
        },"Submissions fetched successfully")
    )
})