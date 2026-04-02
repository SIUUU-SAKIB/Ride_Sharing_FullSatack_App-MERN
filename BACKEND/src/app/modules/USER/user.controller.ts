import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { request } from "node:http";
import { uploadToCloudinary } from "../../utils/cloudinary/uploadToCloudinary";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../utils/createError";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const file = req.file;
    let imageUrl
    if (file) {
        imageUrl = await uploadToCloudinary(file);
    }
    const result = await UserService.createUser({
        ...payload,
        profilePhoto: imageUrl?.url,
        profilePhotoId: imageUrl?.public_id,
        isVerified:false
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User created successfully ✅, Now check email to verify in 5 minutes",
        data: result,
    });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const payload = req.body
    const file = req.file;

    let imageUrl
    if (file) {
        imageUrl = await uploadToCloudinary(file);
    }

    const result = await UserService.updateUser({
        ...payload,
        _id: id,
        profilePhoto: imageUrl?.url,
        profilePhotoId: imageUrl?.public_id
    })

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User updated successfully",
        data: result,
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {

    const { page = "1", limit = "10" } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber

    const result = await UserService.getAllUser(pageNumber, limitNumber, skip)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All user retrived successfully 😍",
        meta: { total: result.totalUser, page: pageNumber, limit: limitNumber, totalPage: Math.ceil(result.totalUser / limitNumber) },
        data: result.allUser,

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


const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw new AppError(StatusCodes.BAD_REQUEST, "No id received !")
    }
    const result = await UserService.getSingleUser(id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `User with ID ${result?._id} retrived successfully.`,
        data: result
    })

})




const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await UserService.updateUserByAdmin(id as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `User updated by ${req.user?.role} successfully`,
        data: result,
    })

})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    if (!req.user?._id) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthrized request")
    }
    const id = req.params.id
    const result = await UserService.deleteUser(id as string, req.user?._id)


    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `Account deleted successfully`,
        data: null,
    })

})
export const UserController = { createUser, getAllUser, getUserByRole, getSingleUser, updateUser, updateUserByAdmin, deleteUser }