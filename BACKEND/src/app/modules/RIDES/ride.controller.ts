import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/createError";
import { StatusCodes } from "http-status-codes";
import { RidesService } from "./rides.service";
import sendResponse from "../../utils/sendResponse";

const createRideRequest = catchAsync(async (req: Request, res: Response) => {
   const riderId = req.user?._id
   const { pickupLocation, dropOffLocation } = req.body
   if (!riderId) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Rider not found.')
   }
   
   const result = await RidesService.createRideRequest(riderId, pickupLocation, dropOffLocation)

   sendResponse(res, {
      statusCode: StatusCodes.ACCEPTED,
      success: true,
      message: "Ride request successfully submitted, waiting for a driver to accept.",
      data: result
   })
})

const getAllRideRequest = catchAsync(async(req:Request, res:Response) => {
   const {page="1", limit = "10"} = req.query
   const pageNumber = Number(page)
   const limitNumber = Number(limit)
   const skip = (pageNumber - 1 ) * limitNumber

   const result = await RidesService.getAllRideRequest(pageNumber, limitNumber, skip)
       sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "All available rides retrived successfully 😍",
        meta: { total: result.totalRides, page: pageNumber, limit: limitNumber, totalPage: Math.ceil(result.totalRides / limitNumber) },
        data: result.allAvailableRides,

    })
})
export const RidesController = { createRideRequest, getAllRideRequest }