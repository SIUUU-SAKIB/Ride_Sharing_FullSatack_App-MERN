import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import bcrypt from "bcryptjs";
import { createUserTokens } from "../../utils/tokens";
import { UserDB } from "../USER/user.model";
import { IUser } from "../USER/user.interface";

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



export const AuthService = { credentialsLogin }