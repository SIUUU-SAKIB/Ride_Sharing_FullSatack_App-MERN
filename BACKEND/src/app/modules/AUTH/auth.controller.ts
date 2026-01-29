import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/tokens";
import { AuthService } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
    console.log(req.user)
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
    // await UserService.logout(req?.user?.userId)
    sendResponse(res, {
        statusCode: 200,
        message: 'Logged out successflly'
    })
})

export const AuthController = { credentialsLogin, logout }