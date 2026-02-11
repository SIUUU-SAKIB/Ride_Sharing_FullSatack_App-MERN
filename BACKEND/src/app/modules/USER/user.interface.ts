import { JwtPayload } from "jsonwebtoken";

export enum IUserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}
export enum IVehicleType {
    TWO_WHEELER = "TWO_WHEELER",
    THREE_WHEELER = "THREE_WHEELER",
    FOUR_WHEELER = "FOUR_WHEELER"
}
export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}
export interface JwtUserPayload extends JwtPayload {
    userId?: string;
    role?: string;
}

export interface IUser {
    _id?: string,
    googleId: string,
    name: string,
    vehicleType: IVehicleType,
    email: string,
    phone?: string,
    password: string,
    profilePhoto?: string,
    role: IUserRole,
    isActive?: boolean,
    isVerified: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    auths?: IAuthProvider,
    accessToken?: string,
    refreshToken?: string
}
