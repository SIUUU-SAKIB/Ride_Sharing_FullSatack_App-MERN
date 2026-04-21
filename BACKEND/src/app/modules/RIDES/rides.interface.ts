import { Types } from "mongoose";
import { IUser, IUserRole } from "../USER/user.interface";
import { IAdminRole } from "../ADMIN/admin.interface";
import { IRideLocation, PaymentMethod } from "../RIDE REQUEST/rideRq.interface";

export enum RideStatus {
    REQUESTED = "REQUESTED",
    ACCEPTED = "ACCEPTED",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
}

export interface IRider extends IUser{
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


export interface IRide {
    riderId: Types.ObjectId;
    driverId: Types.ObjectId;
    pickupLocation: IRideLocation;
    dropOffLocation: IRideLocation;
    distanceKM?: number;
    estimatedFare?: number;
    finalFare?: number;

    status: RideStatus;

    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;

    requestedAt: Date;
    acceptedAt?: Date;
    startedAt?: Date;
    completedAt?:Date,
    cancelledAt?:Date,

    cancelledBy?:IAdminRole | IUserRole
}
