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

export const UserController = { createUser, updateUser}