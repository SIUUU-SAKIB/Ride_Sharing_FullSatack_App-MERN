import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/tokens";
import { UserDB } from "../USER/user.model";
import { IUser } from "../USER/user.interface";
import { bcryptHashing } from "../../utils/bcrypt";
import { enviromentVariables } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken"
import { sendEmail } from "../../utils/sendEmail";
const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    const isUserExist = await UserDB.findOne({ email }).select("+password")

    if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "OOPS user does not exist")
    }
    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)
    if (!isPasswordMatched) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password")
    }
    // if (isUserExist.isVerified === false) {
    //     throw new AppError(StatusCodes.CONFLICT, 'OOPS youre not verified yet')
    // }
    const tokens = createUserTokens(isUserExist)
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
        throw new AppError(StatusCodes.NOT_FOUND, 'User does not exist')
    }
    if (isUserExist.isVerified === false) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not verfified')
    }
    const jwtPayload: JwtPayload = {
        _id: isUserExist._id.toString(),
        role: isUserExist.role
    }
    const resetToken = jwt.sign(jwtPayload, enviromentVariables.JWT_SECRET, { expiresIn: "10m" })
    const resetUILink = `${enviromentVariables.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

    sendEmail({
        to: isUserExist.email,
        subject: "Password Reset",
        templateName: "forgetPassword",
        templateData: {
            name: isUserExist.name,
            resetUILink
        }
    })
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