import jwt from 'jsonwebtoken'
import { ApiResponse } from './api-response.js';
function SendToken(user, statusCode, res) {
    console.log(user.name)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  };
  const token = jwt.sign({ id: user._id, role: user._role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  })
  res.cookie("token", token, cookieOptions);
  const response = new ApiResponse(200,{
      id: user._id,
      name: user.name,
      role: user.role,
      image: user.image
  },"Token sent successfully")
  res.status(statusCode).json({token ,response});
}

export default SendToken;