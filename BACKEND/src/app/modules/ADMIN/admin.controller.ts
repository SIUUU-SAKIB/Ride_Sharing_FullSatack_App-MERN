import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { IAdmin } from "./admin.interface"
import AppError from "../../utils/createError"
import { StatusCodes } from "http-status-codes"
import { AdminService } from "./admin.service"
import sendResponse from "../../utils/sendResponse"
import { AdminDB } from "./admin.model"
import { enviromentVariables } from "../../config/env"
import id from "zod/v4/locales/id.js"

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
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Admin id is required")
    }
    const result = await AdminService.deleteAdmin(_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin deleted sucessfully",
        data: result
    })
})
const blockAdmin = catchAsync(async (req: Request, res: Response) => {
    const { _id } = req.params
    if (!_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Admin id is required")
    }
    const result = await AdminService.blockAdmin(_id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin blocked successfully",
        data: result
    })
})
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const { token } = req.query;
    const user = await AdminDB.findOne({
        verificationToken: token,
        verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
        return res.redirect(`${enviromentVariables.FRONTEND_URL}/token-expired`)
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined
    await user.save()
    res.redirect(`https://www.pexels.com/`)
})


export const AdminController = { createAdmin, verifyEmail, deleteAdmin, blockAdmin }

