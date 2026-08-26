import { ObjectId, Schema, Types } from "mongoose";

export enum IVehicleType {
    BIKE = "BIKE",
    CNG = "CNG",
    CAR = "CAR"
}
export enum IGender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}
export enum IVehicleOwnsership {
    OWNED = "Owned",
    RENT = "Rent"
}
export enum IDriverStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IDriverApplication {
    userId?: Types.ObjectId,
    licenseNumber: string;
    vehicleNumber: string;
    vehicleType: IVehicleType;
    vehicleName: string,
    nidNumber: string;
    phoneNumber: string;
    bloodType: string;
    address: string;
    gender: IGender;
    vehicleOwnership: IVehicleOwnsership;
    licenseImage: string;
    reviewdBy?: Types.ObjectId,
    reviewerName?: string,
    reviewerEmail?: string,
    reviewdAt?: Date,
    rejectionReason?: string,
    vehicleImage: string;
    status: IDriverStatus;
    isBlocked: boolean
}

export interface IDriverProfile {
    userId?: Types.ObjectId,
    driverId?: string,
    name?: string,
    email?: string,
    vehicleNumber: string,
    phone: string,
    vehicleType: IVehicleType,
    licenseNumber: string,
    isActive?: boolean,
    isBlocked?: boolean,
    bloodType?: string,
    isAvailable?: boolean,
    address: string,
    status?: IDriverStatus
}