import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await UserService.createUser(payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User created successfully ✅",
        data: result
    })

})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUser()
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All user retrived successfully 😍",
        meta: { total: result.user.totalUser },
        data: result.user.allUser,

    })
})
export const UserController = { createUser, getAllUser }