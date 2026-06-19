import { ObjectId, Schema, Types } from "mongoose";

export enum IVehicleType {
    TWO_WHEELER = "Two Wheeler",
    THREE_WHEELER = "Three Wheeler",
    FOUR_WHEELER = "Four Wheeler"
}
export enum IGender {
    MALE = "Male",
    FEMALE = "Female",
    TRANSGENDER = "Transgender"
}
export enum IVehicleOwnsership {
    OWNED = "Owned",
    RENT = "Rent"
}
export enum IDriverStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected"
}

export interface IDriverApplication {
    userId?:Types.ObjectId,
    licenseNumber: string;
    vehicleNumber: string;
    vehicleType: IVehicleType;
    vehicleName:string,
    nidNumber: string;
    phoneNumber: string;
    bloodType: string;
    address: string;
    gender: IGender;
    vehicleOwnership: IVehicleOwnsership;
    licenseImage: string;
    reviewdBy?:Types.ObjectId,
    reviewerName?:string,
    reviewerEmail?:string,
    reviewdAt?:Date,
    rejectionReason?:string,
    vehicleImage: string;
    status: IDriverStatus;
    isBlocked:boolean
}

export interface IDriverProfile {
    userId?: Types.ObjectId,
    driverId?:string,
    name?:string,
    email?:string,
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