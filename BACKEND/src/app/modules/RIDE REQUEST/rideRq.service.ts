import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IRideRequest, PaymentMethod, RideRequestStatus } from "./rideRq.interface";
import { RideRequestDB } from "./rideRq.model";
import { calculateDistanceKM } from "../../utils/ride/calculateDistance";
import { DriverProfileDB } from "../DRIVER/driver.model";
import { RidesDB } from "../RIDES/rides.model";
import { RideStatus } from "../RIDES/rides.interface";
import { IVehicleType } from "../DRIVER/driver.interface";

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
  if (payload) {
    if (payload?.estimatedPassengers && payload?.estimatedPassengers > 0 && payload?.vehicleRequest === IVehicleType.BIKE) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Maximum pasenger for bike is 1")
    }
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

  const rideExpires = new Date(Date.now() + 20 * 60 * 1000)
  const rawDistance = calculateDistanceKM(lat1, lng1, lat2, lng2);
  const distanceKM = Number(rawDistance.toFixed(2));

  const estimatedFare = Number(calculateFare(distanceKM).toFixed(2));

  const mainPayload = {
    riderId: riderId,
    pickupLocation: payload.pickupLocation,
    dropoffLocation: payload.dropoffLocation,
    status: RideRequestStatus.PENDING,
    payment: payload.payment,
    vehicleRequest: payload.vehicleRequest,
    estimatedPassengers: payload.estimatedPassengers,
    distanceKM: distanceKM,
    estimatedFare: estimatedFare,
    expiresAt: rideExpires,
    specificInstruction: payload.specificInstruction ? payload.specificInstruction : "N/A"
  }
  const rideRq = await RideRequestDB.create(mainPayload)
  return rideRq
}
const getSingleRideRequst = async(_id:string) => {
const rideRequest =await RideRequestDB.find({_id})
if(!rideRequest) {
  throw new AppError(StatusCodes.NOT_FOUND, "No ride requst found")
}
return rideRequest
}
const acceptRideRequest = async (_id: string, rideId: string) => {

  const driver = await DriverProfileDB.findOne({ userId: _id });
  console.log(driver)
  if (!driver) {
    throw new AppError(404, "Driver not found");
  }

  if (!driver.isAvailable) {
    throw new AppError(400, "Driver is not available");
  }

  const now = new Date();

  const rideRq = await RideRequestDB.findOneAndUpdate(
    {
      _id: rideId,
      status: RideRequestStatus.PENDING,
      expiresAt: { $gt: now }
    },
    {
      $set: {
        driverId: driver.userId,
        status: RideRequestStatus.MATCHED,
        fulfilledAt: now
      }
    },
    { new: true }
  );


  if (!rideRq) {
    throw new AppError(400, "Ride already taken or expired");
  }

  driver.isAvailable = false;
  await driver.save();

  return await RidesDB.create({
    riderId: rideRq.riderId,
    driverId: driver.userId,
    pickupLocation: rideRq.pickupLocation,
    dropoffLocation: rideRq.dropoffLocation,
    status: RideStatus.ACCEPTED,
    requestedAt: rideRq.createdAt,
    acceptedAt: now,
    estimatedFare: rideRq.estimatedFare
  });
};


export const RideRequestService = { RideRequest, acceptRideRequest, getSingleRideRequst }