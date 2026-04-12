import { Types } from "mongoose";
import { IRideLocation} from "../RIDES/rides.interface";

export enum RideRequestStatus {
    PENDING = "PENDING",
    MATCHED = "MATCHED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}
export interface IRideRequest {
    riderId: Types.ObjectId,
    driverId?:Types.ObjectId,
    pickUpLocation: IRideLocation,
    dropOffLocation: IRideLocation,
    status: RideRequestStatus,
    expiresAt: Date,
    cancelledAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}