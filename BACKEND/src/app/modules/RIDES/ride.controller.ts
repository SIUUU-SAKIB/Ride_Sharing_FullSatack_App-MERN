import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/createError";
import sendResponse from "../../utils/sendResponse";
import {RidesService } from "./rides.service";

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
    const rideID = req.params.id;
    const driverID = req.user?._id;
    const {status} = req.body
    if (!rideID) throw new AppError(404, `Ride ID required`)
    if (!driverID) throw new AppError(404, `Driver ID required`)
    if (!status) throw new AppError(404, `Status required`)
    const result = await RidesService.updateRideStatus(driverID, rideID as string, status)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Ride status successfully updated to" + status,
        data: result
    })
})

export const RidesController = {updateRideStatus}