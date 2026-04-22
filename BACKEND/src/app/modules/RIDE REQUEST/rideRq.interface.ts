import { Types } from "mongoose";
import { IVehicleType } from "../DRIVER/driver.interface";


export interface IRideLocation {
    lat: number,
    lng: number,
    address: string
}

export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID"
}
export enum PaymentMethod {
    BKASH = "BKASH",
    CARD = "CARD",
    CASH = "CASH"
}

export enum RideRequestStatus {
    PENDING = "PENDING",
    MATCHED = "MATCHED",
    ONGOING = "OGOING",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}
export interface IRideRequest {
    riderId: Types.ObjectId,
    driverId?:Types.ObjectId,
    pickupLocation: IRideLocation,
    dropoffLocation: IRideLocation,
    status: RideRequestStatus,
    payment?: PaymentMethod,
    vehicleRequest: IVehicleType,
    estimatedPassengers?: number,
    estimatedFare?: number,
    distanceKM?:number,
    specificInstruction?: string,
    expiresAt: Date,
    cancelledAt?: Date,
    fulfilledAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
}