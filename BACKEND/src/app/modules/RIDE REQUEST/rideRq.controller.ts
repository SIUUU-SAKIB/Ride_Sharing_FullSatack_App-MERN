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
const getSingleRideRequest = catchAsync(async(req:Request,res:Response) => {
    const {id} = req.params;
    const userId = req.user?._id;
    if(!id) {
        throw new AppError(StatusCodes.NOT_FOUND, "Ride requst id required")
    }
    const result = await RideRequestService.getSingleRideRequst(id as string, userId)
    sendResponse(res, {
        success:true,
        statusCode:200,
        message:"Ride Request fetched successfully",
        data:result
    })

})

const acceptRideRequest = catchAsync(async (req: Request, res: Response) => {
    const driverID = req.user?._id;
    const rideID = req.params.rideID

    if (!driverID)
        throw new AppError(StatusCodes.NOT_FOUND, "Driver ID required")

    const result = await RideRequestService.acceptRideRequest(driverID, rideID as string)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Ride request accepted successfully",
        data: result
    })

})


export const RideRequestController = { rideRequest, acceptRideRequest, getSingleRideRequest}