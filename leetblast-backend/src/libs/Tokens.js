import jwt from 'jsonwebtoken'
import { ApiResponse } from './api-response.js';
import crypto from 'crypto'
import { ApiError } from './api-error.js';
const genTempToken = function(){
  try {
    const unHashedToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');;
    const tokenExpiry = new Date() + 24*60 * 60 * 1000;
    return {unHashedToken,hashedToken,tokenExpiry}
  } catch (error) {
    throw new ApiError(500,'Unable to generate token',error);
  }
}

const refreshToken = function(user){
  try {
    return jwt.sign(
      {id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,}
      ,process.env.JWT_REFRESH_TOKEN_SECRET,
      {expiresIn: '7d'}
    )
  } catch (error) {
    throw new ApiError(500,'Unable to generate token',error);
  }
}
const accessToken = function (user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '15m'}
  )
}
export  {genTempToken,refreshToken,accessToken};