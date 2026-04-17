import { ObjectId } from "mongoose";

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
export enum IStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IDriverApplication {
    userId?: ObjectId,
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
    reviewdBy?:string,
    reviewdAt?:Date,
    rejectionReason?:string,
    vehicleImage?: string;
    status: IStatus;
}

export interface IDriverProfile {
    userId?: ObjectId,
    vehicleNumber: string,
    vehicleType: IVehicleType,
    licenseNumber: string,
    isActive?: boolean,
    isBlocked?: boolean,
    bloodType?: string,
    isAvailable?:boolean,
    address: string,
    status?: IStatus
}