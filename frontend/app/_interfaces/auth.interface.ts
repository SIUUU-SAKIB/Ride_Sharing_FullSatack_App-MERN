export interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    phone: string,
    profilePhoto?: FileList
}
export interface LoginPayload {
    email: string,
    password: string
}
export interface OTPPayload {
    otp: string,
    newPassword: string
}

