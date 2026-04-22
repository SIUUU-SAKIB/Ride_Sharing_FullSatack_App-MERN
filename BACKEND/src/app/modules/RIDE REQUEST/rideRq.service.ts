import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IRideRequest, PaymentMethod, RideRequestStatus } from "./rideRq.interface";
import { RideRequestDB } from "./rideRq.model";
import { IVehicleType } from "../DRIVER/driver.interface";
import { calculateDistanceKM } from "../../utils/ride/calculateDistance";

const BASE_FARE = 50
const PER_KM_RATE = 15

const calculateFare = (distance: number) => {
    return BASE_FARE + distance * PER_KM_RATE
}

const RideRequest = async (riderId: string, payload: Partial<IRideRequest>) => {
    const rider = await UserDB.findById(riderId)
    if (!rider) {
        throw new AppError(StatusCodes.NOT_FOUND, "Rider does not exist")
    }

    const existingRide = await RideRequestDB.findOne({
        riderId,
        status: { $in: [RideRequestStatus.PENDING, RideRequestStatus.MATCHED] }
    })
    if (existingRide?.status === RideRequestStatus.PENDING || existingRide?.status === RideRequestStatus.MATCHED) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You already have an active ride request")
    }


    if (!payload.pickupLocation || !payload.dropoffLocation) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Pickup and dropoff locations are required")
    }
    if (
        !payload.pickupLocation?.lat ||
        !payload.pickupLocation?.lng ||
        !payload.dropoffLocation?.lat ||
        !payload.dropoffLocation?.lng
    ) {
        throw new AppError(400, "Invalid coordinates");
    }
    const { lat: lat1, lng: lng1 } = payload.pickupLocation
    const { lat: lat2, lng: lng2 } = payload.dropoffLocation


    const rideExpires = new Date(Date.now() + 5 * 60 * 1000) //5 min
    const calculateDistance = calculateDistanceKM(lat1, lng1, lat2, lng2)
    const estimatedFare = calculateFare(calculateDistance)

    const mainPayload = {
        riderId: riderId,
        pickupLocation: payload.pickupLocation,
        dropoffLocation: payload.dropoffLocation,
        status: RideRequestStatus.PENDING,
        payment: PaymentMethod.CASH,
        vehicleRequest: IVehicleType.FOUR_WHEELER,
        estimatedPassengers: payload.estimatedPassengers,
        distanceKM: calculateDistance,
        estimatedFare: Math.trunc(estimatedFare),
        expiresAt: rideExpires
    }
    await RideRequestDB.create(mainPayload)
    return mainPayload
}
export const RideRequestService = { RideRequest }