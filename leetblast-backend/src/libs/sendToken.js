import jwt from 'jsonwebtoken'

function SendToken(user, statusCode, res) {
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
  res.status(statusCode).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  })
}

export default SendToken;