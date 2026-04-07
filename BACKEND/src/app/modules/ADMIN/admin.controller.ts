import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { IAdmin } from "./admin.interface"
import AppError from "../../utils/createError"
import { StatusCodes } from "http-status-codes"
import { AdminService } from "./admin.service"
import sendResponse from "../../utils/sendResponse"

const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const payload: Partial<IAdmin> = req.body
    if (!payload) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Admin payload is required')
    }
    const result = await AdminService.createAdmin(payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "Admin created successfully, now verify the email to complete the final registration.",
        data: result
    })
})


export const AdminController = { createAdmin }

