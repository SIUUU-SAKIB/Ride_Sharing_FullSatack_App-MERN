import { Types } from "mongoose";
import { IUser, IUserRole } from "../USER/user.interface";

export enum RideStatus {
    REQUESTED = "requested",
    ACCEPTED = "accepted",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

export enum PaymentStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
}

export interface IRider extends IUser {
    _id?: string,
    role: IUserRole.RIDER,
    defaultPickupLocation?: {
        lat: number,
        lng: number,
        address: string
    }
}
export interface IDriver extends IUser {
    _id?: string,
    role: IUserRole.DRIVER,
    isAvailable: boolean,
    currentLocation: {
        lat: number,
        lng: number
    }
    rating?: number
}
export interface IRideLocation {
    lat: number,
    lng: number,
    address: string
}
export enum RideRequestStatus {
    PENDING = "PENDING",
    MATCHED = "MATCHED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}

export enum paymentMethod {
    CASH = "CASH",
    BKASH = "BKASH",
    CARD = "CARD"
}

export interface IRide {

    riderId: Types.ObjectId,
    driverId: Types.ObjectId,
    pickupLocation: IRideLocation,
    dropoffLocation: IRideLocation,

    distanceKM?: number,
    estimatedFare?: number,
    finalFare?: number,

    status: RideStatus,

    paymentStatus: PaymentStatus,
    paymentMethod: paymentMethod,

    requestedAt: Date,
    acceptedAt?: Date,
    startedAt?: Date,
    completedAt?: Date,
    cancelledAt?: Date,

    cancelledBy?: IUserRole
}
export interface IRideRequest {
    riderId: Types.ObjectId,
    pickupLocation: IRideLocation,
    dropOffLocation: IRideLocation,

    status: RideRequestStatus,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date
}