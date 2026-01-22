export enum IUserRole {
    ADMI = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}
export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}
export interface IUser {
    id?: string,
    name: string,
    email: string,
    phone: string,
    password?: string,
    role: IUserRole,
    isActive: boolean,
    isVerified: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    auths?:IAuthProvider
}