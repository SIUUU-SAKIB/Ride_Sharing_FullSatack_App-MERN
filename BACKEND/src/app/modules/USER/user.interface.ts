import { JwtPayload } from "jsonwebtoken";

export enum IUserRole {
    RIDER = "RIDER",
    DRIVER = "DRIVER"
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
    googleId?: string,
    name: string,
    email: string,
    phone?: string,
    password: string,
    otp?: string,
    otpExpires?: Date,
    profilePhoto?: string,
    profilePhotoId?: string,
    verificationToken?: string,
    verificationTokenExpires?: Date,
    role: IUserRole,
    baseLocation?: string,
    isActive?: boolean,
    isVerified: boolean,
    isBlocked?:boolean,
    createdAt?: Date,
    updatedAt?: Date,
    auths?: IAuthProvider,
    accessToken?: string,
    refreshToken?: string,
    loginAttempt?: number,
    lockUntil?: Date | null
}
