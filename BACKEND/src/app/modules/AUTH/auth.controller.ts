import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/tokens";
import { AuthService } from "./auth.service";
import AppError from "../../utils/createError";


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

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId
  const { oldPass, newPass } = req.body
  await AuthService.changePassword(id as string, oldPass, newPass)
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
    message: "Password Change successfully",
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

export const AuthController = { credentialsLogin, logout, changePassword, refreshToken }