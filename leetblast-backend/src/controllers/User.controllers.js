import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";
import bcrypt from 'bcrypt'
import { genAccessToken, genRefreshToken, genTempToken  } from "../libs/Tokens.js";
import { emailVerificationMailGenContent, sendMail } from "../libs/mails.js";
import crypto from 'crypto'
//register User
export const registerUser = asyncHandler(async(req, res)=>{
   
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
   const {unHashedToken,hashedToken,tokenExpiry} = await genTempToken();
    const user = await db.user.create({
        data: {
            name,
            email,
            image,
            password: hashedPassword,
            verificationToken: hashedToken,
            verificationTokenExpiry: tokenExpiry
        }
    })
    if(!user){
        res.status(400).json(new ApiResponse(400,"User not created"));
        throw new ApiError(400, "User not created",);
    }
    const verifactionUrl = process.env.URL + `/api/v1/user/verify/${unHashedToken}`
    const mailgenContent = emailVerificationMailGenContent(
        name,
        verifactionUrl
    )
    await sendMail({
        email:user.email,
        subject:"Verify your email address",
        mailGenContent:mailgenContent
    })
    res.status(201).json(new ApiResponse(201,{unHashedToken,user: {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
          image: user.image,}},"User created successfully"));
})
//verify User


export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    console.log("Token required!");
    return res.status(400).json(new ApiError(400, "Token required!"));
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.user.findFirst({
    where: { verificationToken: hashedToken },
  });
  if (!user) {
    return res.status(401).json(new ApiError(401, "Token not found!"));
  }

  if (user.isVerified) {
    return res
      .status(409)
      .json(new ApiError(409, "User already verified!"));
  }

  const isTokenExpired = user.verificationTokenExpiry < new Date();
  if (isTokenExpired) {
    return res
      .status(403)
      .json(new ApiError(403,"Token expired, please request a new one."));
  }

   await db.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    },
  });
  return res.redirect("http://localhost:5173/signin");
});
//resend Verfication token
export const resendVerficationToken = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fileds are required!"));
  }

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return res
      .status(401)
      .json(new ApiError(401, "Invalid email or password"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Invalid email or password");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  if (user.isVerified) {
    console.log("User already verified!");
    return res
      .status(409)
      .json(new ApiError(409, 'User Already Verified'));
  }

  // generate new token :
  const { unHashedToken, hashedToken, tokenExpiry } =
    await genTempToken();

  // update the database :
 await db.user.update({
    where: { id: user.id },
    data: {
      verificationToken: hashedToken,
      verificationTokenExpiry: new Date(tokenExpiry),
    },
  });


  // send email :
  const verificationUrl = process.env.URL + `/api/v1/user/verify/${unHashedToken}`;
  const mailGenContent = emailVerificationMailGenContent(
    user.name,
    verificationUrl,
  );
  await sendMail({
    email: user.email,
    subject: "Verify your email address",
    mailGenContent,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Verification email sent successfully!"));
});
//login user
export const login = asyncHandler(async(req, res)=>{
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
   const accessToken =  await genAccessToken(user);
   const refreshToken = await genRefreshToken(user) 
  await db.user.update({
    where: { id: user.id },
    data: {
      refreshToken: refreshToken,
      refreshTokenExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    },
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
res.status(200).json(
    new ApiResponse(200, "User Login Successfully!", {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    }),
  );
})

//refresh token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  const user = await db.user.findFirst({
    where: { refreshToken },
  });
  if (
    !user ||
    !user.refreshTokenExpiry ||
    user.refreshTokenExpiry < new Date()
  ) {
    return res
      .status(401)
      .json(new ApiError(401, "Refresh token expired or invalid"));
  }

  const accessToken = await genAccessToken(user);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  return res.status(200).json(
    new ApiResponse(200, "New access token generated!", {
      accessToken,
    }),
  );
});

//forget Password

//reset Password

//get Profile
//update Profile

//logout

//delete account
//Admin Controllers

//get all users
//get user by id
//update user by id
//make user admin
//delete user by id
