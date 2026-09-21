import { Types } from "mongoose";
import { IUser, IUserRole } from "../USER/user.interface";
import { IAdminRole } from "../ADMIN/admin.interface";
import { IRideLocation, PaymentMethod } from "../RIDE REQUEST/rideRq.interface";

export enum RideStatus {
  REQUESTED = "REQUESTED",
  SEARCHING_DRIVER = "SEARCHING_DRIVER",
  DRIVER_ACCEPTED = "DRIVER_ACCEPTED",
  DRIVER_ARRIVING = "DRIVER_ARRIVING",
  DRIVER_ARRIVED = "DRIVER_ARRIVED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum PaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED"
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
        lng: number,
        address?:string
    }
    rating?: number
}

export interface IRide {
    riderId: Types.ObjectId;
    driverId: Types.ObjectId;
    pickupLocation: IRideLocation;
    dropoffLocation: IRideLocation;
    distanceKM?: number;
    estimatedFare?: number;
    finalFare?: number;
    status: RideStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    requestedAt: Date;
    acceptedAt?: Date;
    startedAt?: Date;
    completedAt?: Date,
    cancelledAt?: Date,
    cancelledBy?: IAdminRole | IUserRole
}
