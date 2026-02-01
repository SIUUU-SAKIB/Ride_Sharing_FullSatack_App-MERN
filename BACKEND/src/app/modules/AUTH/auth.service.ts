import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/tokens";
import { UserDB } from "../USER/user.model";
import { IUser } from "../USER/user.interface";
import { bcryptHashing } from "../../utils/bcrypt";
import { enviromentVariables } from "../../config/env";

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
    if(oldPass === newPass) {
        throw new AppError(StatusCodes.BAD_REQUEST, "New password must be different from old password")
    }
    const hashedPassword = await bcrypt.hash(newPass as string, Number(enviromentVariables.BCRYPT_SALT_ROUND))
    user.password = hashedPassword
    await user.save()
    
    return null
}



export const AuthService = { credentialsLogin, changePassword }