import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { DriverServices } from "./driver.service";
import sendResponse from "../../utils/sendResponse";
import { uploadToCloudinary } from "../../utils/cloudinary/uploadToCloudinary";

const driverApplication = catchAsync(async (req: Request, res: Response) => {
    const  userId  = req.user?._id;
    const files = req.files as {
        [fieldName:string] : Express.Multer.File[]
    }
 let licenseImage, nidImage, vehichleImage;


    const payload = req.body
    if (!userId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "userId is required")
    }
    const application = await DriverServices.driverApplication(userId as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: 'Applicatiomn for driver submitted successfully, please wait for admin to approve',
        data: application
    })
})

export const DriverController = { driverApplication }