import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { RideRequestService } from "./rideRq.service";
import sendResponse from "../../utils/sendResponse";

const rideRequest = catchAsync(async (req: Request, res: Response) => {
    const riderId = req.user?._id;
    const payload = req.body;
    if (!riderId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Rider ID is required.")
    }
    const result = await RideRequestService.RideRequest(riderId, payload)
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Ride request created successfully",
        data: result
    })
})


const acceptRideRequest = catchAsync(async (req: Request, res: Response) => {
    const driverId = req.user?._id;
    const rideId = req.params.id
    if (!driverId)
        throw new AppError(StatusCodes.NOT_FOUND, "Driver ID required")

    const result = RideRequestService.acceptRideRequest(driverId, rideId as string)
    var message = "Ride request accepted successfully"
    sendResponse(res, {
        success:true,
        statusCode:200,
        message:message,
        data:result
    })
})
export const RideRequestController = { rideRequest }