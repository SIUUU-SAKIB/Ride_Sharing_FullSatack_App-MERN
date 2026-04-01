import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/tokens";
import { UserDB } from "../USER/user.model";
import { IUser } from "../USER/user.interface";
import { enviromentVariables } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { sendOtp } from "../../utils/sendEmail";
const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExist = await UserDB.findOne({ email }).select({
        password: 1,
        role:1
    })
    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "OOPS user does not exist")
    }
    const isPasswordMatched = await bcrypt.compare(password as string as string, isUserExist.password)
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password")
    }
    if (isUserExist.isVerified === false) {
        throw new AppError(StatusCodes.CONFLICT, 'OOPS youre not verified yet')
    }
    const tokenPayload = {
        _id:isUserExist._id,
        role:isUserExist.role
    }
    const tokens = createUserTokens(tokenPayload)
    const { password: pass, ...rest } = isUserExist.toObject()
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: rest
    }
}

const changePassword = async (id: string, oldPass: string, newPass: string) => {
    const user = await UserDB.findById(id).select("+password")
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User does not exist")
    }
    const isPasswordMatched = await bcrypt.compare(oldPass, user.password)
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Old password is incorrect.")
    }
    if (oldPass === newPass) {
        throw new AppError(StatusCodes.BAD_REQUEST, "New password must be different from old password")
    }
    const hashedPassword = await bcrypt.hash(newPass as string, Number(enviromentVariables.BCRYPT_SALT_ROUND))
    user.password = hashedPassword
    await user.save()
    return null
}

const refreshToken = async (refreshToken: string) => {
    const decodedToken = verifyToken(refreshToken, enviromentVariables.JWT_REFRESH_SECRET) as JwtPayload
    const user = await UserDB.findById(decodedToken._id)
    if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "User no longer exist")
    }
    return createUserTokens({
        _id: user._id?.toString(),
        role: user.role,
    })
}

const forgetPassword = async (email: string) => {
    const isUserExist = await UserDB.findOne({ email })
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "If account exists, OTP sent")
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    isUserExist.otp = otp
    isUserExist.otpExpires = new Date(Date.now() + 10 * 60 * 1000)
    await isUserExist.save()
    await sendOtp(
        isUserExist.email, "Reset Password Token", otp
    )
    return 'Password reset Link sent'
}

const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload._id != decodedToken._id) {
        throw new AppError(401, "You cannot reset password")
    }
    const isUserExist = await UserDB.findById(decodedToken._id)
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist')
    }

    const hashedPassword = await bcrypt.hash(payload.newPassword, Number(enviromentVariables.BCRYPT_SALT_ROUND))
    isUserExist.password = hashedPassword
    await isUserExist.save()

}
export const AuthService = { credentialsLogin, changePassword, refreshToken, forgetPassword, resetPassword }