import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/tokens";
import { AuthService } from "./auth.service";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { enviromentVariables } from "../../config/env";

import bcrypt from "bcryptjs"
const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await AuthService.credentialsLogin(payload)
  const userTokens = createUserTokens(result.user)
  setAuthCookie(res, userTokens)
  console.log(req.user)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged in successfully ✅",
    data: result
  })

})

const logout = catchAsync(async (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  }

  res.clearCookie("accessToken", cookieOptions)
  res.clearCookie("refreshToken", cookieOptions)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged out successfully",
    data: null,
  })
})

export const refreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Refresh token missing"
      );
    }

    const tokens = await AuthService.refreshToken(refreshToken);

    setAuthCookie(res, tokens);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Token refreshed successfully",
      data: null,
    });
  }
);
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body
  await AuthService.forgetPassword(email)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Please click to the link we sent you on " + email,
    data: null,
  });
})
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query;
  const { password } = req.body
  if (!token || !password) {
    throw new AppError(StatusCodes.NOT_FOUND, `Please provide token and password`)
  }
  res.redirect(`http://localhost:${enviromentVariables.PORT}/auth/reset-password`)
})
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { otp, newPassword } = req.body
  const user = await UserDB.findOne({
    otp: otp,
    otpExpires: { $gt: Date.now() }
  })
  if (!user) {
    return res.send("Invalid or expired otp ❌")
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  user.password = hashedPassword
  user.otp = undefined
  user.otpExpires = undefined
  await user.save()
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password reset successfully",
    data: null,
  });
})

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query;
  const user = await UserDB.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });
  console.log(user)
  if (!user) {
    return res.redirect(`${enviromentVariables.FRONTEND_URL}/token-expired`)
  }
  user.isVerified = true,
    user.verificationToken = undefined
  user.verificationTokenExpires = undefined
  await user.save()
  res.redirect(`${enviromentVariables.FRONTEND_URL}/auth/login`)
})
const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id
  console.log(userId)
  const user = await UserDB.findById(userId).select({
    password: 0,
    auths: 0,
    refreshToken: 0,
    profilePhotoId: 0,
    otp: 0,
    otpExpires: 0,
    verificationToken: 0,
    verificationTokenExpires: 0,
    resetToken: 0,
    resetTokenExpires: 0

  })
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found")
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User fetched successfully",
    data: user
  })


})
export const AuthController = {
  credentialsLogin,
  getMe,
  logout,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  verifyEmail
}
