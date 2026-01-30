import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import { UserDB } from "./user.model"
import { IAuthProvider, IUser, IUserRole } from "./user.interface"
import bcrypt from "bcryptjs";
import { enviromentVariables } from "../../config/env";
import { createUserTokens } from "../../utils/tokens";
const createUser = async (payload: IUser) => {
    const { password, ...rest } = payload
    const isUserExist = await UserDB.findOne({ email: payload.email })
    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Oops user already exist")
    }

    const hashedPassword = await bcrypt.hash(password as string, Number(enviromentVariables.BCRYPT_SALT_ROUND))
    const authProvider: IAuthProvider = { provider: "credentials", providerId: payload.email }
    const user = await UserDB.create(
        {
            ...rest,
            password: hashedPassword,
            auths: authProvider
        }
    )
    return user
}

const getAllUser = async () => {
    const allUser = await UserDB.find()
    const totalUser = await UserDB.countDocuments()
    return {
        user: {
            allUser, totalUser
        }
    }
}

const getUserByRole = async (role: string, page: number, limit: number, skip: number) => {

    console.log(page, limit, skip)
    const user = await UserDB.find({ role: role.toUpperCase() }).skip(skip).limit(limit)
    const total = user.length
    return {
        user, total
    }
}
export const UserService = { createUser, getAllUser, getUserByRole }