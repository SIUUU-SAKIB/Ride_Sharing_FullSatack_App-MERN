import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IRideLocation, RideRequestStatus } from "./rides.interface";
import { RidesRQDB } from "./rides.model";

const createRideRequest = async (riderId: string, pickupLocation: IRideLocation, dropOffLocation: IRideLocation) => {

    const user = await UserDB.findById(riderId)
    if (!user?.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User is not verified")
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

const getAllRideRequest = async (page: number, limit: number, skip: number) => {

    const filter = { status: "PENDING" }
    const allAvailableRides = await RidesRQDB.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
    const totalRides = await RidesRQDB.countDocuments(filter)
    return {
        allAvailableRides, totalRides
    }
}
export const RidesService = { createRideRequest, getAllRideRequest }


