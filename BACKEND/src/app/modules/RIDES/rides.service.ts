import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IRideLocation, RideRequestStatus } from "./rides.interface";
import { RidesRQDB } from "./rides.model";
import { Types } from "mongoose";
// RIDER 
const createRideRequest = async (riderId: string, pickupLocation: IRideLocation, dropOffLocation: IRideLocation) => {

    const user = await UserDB.findById(riderId)
    if (!user?.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is not verified")
    }
    const existingRequest = await RidesRQDB.findOne({
        riderId: new Types.ObjectId(riderId),
        status: RideRequestStatus.PENDING
    })
    if (existingRequest) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You already have an active request")
    }
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000)

    const rideRequest = await RidesRQDB.create({
        riderId,
        pickupLocation,
        dropOffLocation,
        status: RideRequestStatus.PENDING,
        expiresAt
    })
    return rideRequest
}
// RIDER
const cancelRideRequest = async (
    riderId: string,
    rideRqId: string
) => {
    const cancelledRide = await RidesRQDB.findOneAndUpdate(
        {
            _id: rideRqId,
            riderId: new Types.ObjectId(riderId),
            status: RideRequestStatus.PENDING,
        },
        {
            status: RideRequestStatus.CANCELLED,
        },
        { new: true }
    );

    if (!cancelledRide) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "No pending ride request found to cancel"
        );
    }

    return cancelledRide;
};

const getAllRideRequest = async (page: number, limit: number, skip: number) => {

    const filter = { status: "PENDING" }
    const allAvailableRides = await RidesRQDB.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const totalRides = await RidesRQDB.countDocuments(filter)
    return {
        allAvailableRides, totalRides
    }
}
export const RidesService = { createRideRequest, getAllRideRequest, cancelRideRequest }


