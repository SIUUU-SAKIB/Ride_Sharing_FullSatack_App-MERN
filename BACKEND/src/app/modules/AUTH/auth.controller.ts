import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/tokens";
import { AuthService } from "./auth.service";


const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await AuthService.credentialsLogin(payload)

    const userTokens = createUserTokens(result.user)
    setAuthCookie(res, userTokens)
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



export const AuthController = { credentialsLogin, logout }