import AppError from "../../utils/createError";
import { DriverProfileDB } from "../DRIVER/driver.model";
import { RideStatus } from "./rides.interface";
import { RidesDB } from "./rides.model";

const updateRideStatus = async (
    driverID: string,
    rideID: string,
    status: RideStatus
) => {
    const ride = await RidesDB.findById(rideID);

    if (!ride) {
        throw new AppError(404, "Ride not found");
    }

    const driver = await DriverProfileDB.findOne({ userId: driverID });

    if (!driver) {
        throw new AppError(404, "Driver not found");
    }

    if (ride.driverId.toString() !== driver._id.toString()) {
        throw new AppError(403, "You are not assigned to this ride");
    }


    if (ride.status === RideStatus.COMPLETED) {
        throw new AppError(400, "Ride already completed");
    }

    if (ride.status === RideStatus.CANCELLED) {
        throw new AppError(400, "Ride already cancelled");
    }

    if (status === RideStatus.ONGOING && ride.status !== RideStatus.ACCEPTED) {
        throw new AppError(400, "Ride must be accepted first");
    }

    if (status === RideStatus.COMPLETED && ride.status !== RideStatus.ONGOING) {
        throw new AppError(400, "Ride must be ongoing first");
    }
    status.toUpperCase()
    const updatedRide = await RidesDB.findByIdAndUpdate(
        rideID,
        { $set: { status } },
        { new: true }
    );

    return updatedRide;
};

export const RidesService = { updateRideStatus }