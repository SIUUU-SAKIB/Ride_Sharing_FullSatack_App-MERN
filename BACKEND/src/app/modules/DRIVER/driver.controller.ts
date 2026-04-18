import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { DriverServices } from "./driver.service";
import sendResponse from "../../utils/sendResponse";
import { uploadToCloudinary } from "../../utils/cloudinary/uploadToCloudinary";


const driverApplication = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const payload = req.body;

    if (!userId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "userId is required");
    }
    const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
    };
    console.log(files)
    console.log(req.files)
    const licenseImage = files?.licenseImage || [];
    const nidImage = files?.nidImage || [];
    const vehicleImage = files?.vehicleImage || [];
    const uploadFiles = async (fileArray: Express.Multer.File[]) => {
        const results = [];

        for (const file of fileArray) {
            const uploaded = await uploadToCloudinary(file);
            results.push(uploaded);
        }
        return results;
    };
    const licenseUploads = await uploadFiles(licenseImage);
    const nidUploads = await uploadFiles(nidImage);
    const vehicleUploads = await uploadFiles(vehicleImage);

    const application = await DriverServices.driverApplication(userId as string, {
        ...payload,
        licenseImage: licenseUploads,
        nidImage: nidUploads,
        vehicleImage: vehicleUploads,
    });

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "Application for driver submitted successfully, please wait for admin to approve",
        data: application,
    });
});

const checkApplication = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id
    const result = await DriverServices.checkApplication(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `Successfully fetched your status which is ${result}`,
        data: result
    })

})



export const DriverController = { driverApplication, checkApplication }