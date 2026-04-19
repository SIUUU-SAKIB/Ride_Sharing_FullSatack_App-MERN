import { ObjectId, Schema, Types } from "mongoose";

export enum IVehicleType {
    TWO_WHEELER = "TWO_WHEELER",
    THREE_WHEELER = "THREE_WHEELER",
    FOUR_WHEELER = "FOUR_WHEELER"
}
export enum IGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    TRANSGENDER = "TRANSGENDER"
}
export enum IVehicleOwnsership {
    OWNED = "OWNED",
    RENT = "RENT"
}
export enum IDriverStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IDriverApplication {
    userId?:Types.ObjectId,
    licenseNumber: string;
    vehicleNumber: string;
    vehicleType: IVehicleType;
    nidNumber: string;
    phoneNumber: string;
    bloodType: string;
    address: string;
    gender: IGender;
    vehicleOwnership: IVehicleOwnsership;
    licenseImage?: string;
    nidImage?: string;
    reviewdBy?:Types.ObjectId,
    reviewerName?:string,
    reviewerEmail:string,
    reviewdAt?:Date,
    rejectionReason?:string,
    vehicleImage?: string;
    status: IDriverStatus;
    isBlocked:boolean
}

export interface IDriverProfile {
    userId?: Types.ObjectId,
    driverId?:string,
    vehicleNumber: string,
    phone:string,
    vehicleType: IVehicleType,
    licenseNumber: string,
    isActive?: boolean,
    isBlocked?: boolean,
    bloodType?: string,
    isAvailable?:boolean,
    address: string,
    status?: IDriverStatus
}