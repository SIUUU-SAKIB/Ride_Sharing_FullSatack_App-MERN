import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { IUserRole } from "./user.interface";
import { includes } from "zod";


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

const getUserByRole = catchAsync(async (req: Request, res: Response) => {
    const { role } = req.params
    const { page = '1', limit = '10' } = req.query
    if (!role) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Role is required")
    }
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber
    const result = await UserService.getUserByRole(role as string, pageNumber, limitNumber, skip)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `All ${role} retrived successfully 😍`,
        meta: {
            total: result.total, page: pageNumber,
            limit: limitNumber,
            totalPage: Math.ceil(result.total / limitNumber)
        },
        data: result.user

    })
})

export const UserController = { createUser, getAllUser, getUserByRole }