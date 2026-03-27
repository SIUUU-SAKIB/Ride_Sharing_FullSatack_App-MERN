import { StatusCodes } from "http-status-codes"
import AppError from "../../utils/createError"
import { UserDB } from "./user.model"
import { IAuthProvider, IUser } from "./user.interface"
import bcrypt from "bcryptjs";
import { enviromentVariables } from "../../config/env";
import cloudinary from "../../utils/cloudinary/cloudinary";
import crypto from "crypto"
import { sendEmail } from "../../utils/sendEmail";


const createUser = async (payload: IUser) => {
    const { password, ...rest } = payload
    const isUserExist = await UserDB.findOne({ email: payload.email })
    if (isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Oops user already exist")
    }
    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password as string, Number(enviromentVariables.BCRYPT_SALT_ROUND))
    const authProvider: IAuthProvider = { provider: "credentials", providerId: payload.email }
    const user = await UserDB.create(
        {
            ...rest,
            profilePhoto: payload.profilePhoto,
            profilePhotoId: payload.profilePhotoId,
            password: hashedPassword,
            auths: authProvider,
            verificationToken: token,
            verificationTokenExpires: Date.now() + 10 * 60 * 1000
        }
    )
    const link = `http://localhost:${enviromentVariables.PORT}/api/v1/auth/verify-email?token=${token}`
    await sendEmail(user?.email, `Verify Email`, link)
    return user
}
const updateUser = async (payload: Partial<IUser>) => {
    const { _id, ...updatedData } = payload
    const isUserExist = await UserDB.findById(_id)
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }

    if (payload.profilePhoto && isUserExist.profilePhotoId) {
        await cloudinary.uploader.destroy(isUserExist.profilePhotoId as string)
    }

    const updatedUser = await UserDB.findByIdAndUpdate(
        _id,
        {
            ...updatedData,
            ... (payload && {
                profilePhoto: payload.profilePhoto,
                profilePhotoId: payload.profilePhotoId
            })
        }, {
        new: true,
        runValidators: true
    }
    ).select("-password")
    return {
        updatedUser
    }
}
const getAllUser = async (page: number, limit: number, skip: number) => {
    const allUser = await UserDB.find().skip(skip).limit(limit)
    const totalUser = await UserDB.countDocuments()
    return {
        allUser, totalUser
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

const getSingleUser = async (id: string) => {
    const user = await UserDB.findById(id)
    return user
}



const updateUserByAdmin = async (id: string, payload: Partial<IUser>) => {
    const isUserExist = await UserDB.findById(id)
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }

    const user = await UserDB.findByIdAndUpdate(id, payload, {
        new: true, runValidators: true
    })

    return user
}

const deleteUser = async (id: string, userId: string) => {
    const isUserExist = await UserDB.findById(id)
    if (!isUserExist) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found")
    }
    const authenticateAccount = userId === isUserExist._id.toString()
    if (!authenticateAccount) {
        throw new AppError(StatusCodes.FORBIDDEN, "You are not allowed to delete this account")
    }
    return await UserDB.findByIdAndDelete(id)
}

export const UserService = { createUser, getAllUser, getUserByRole, getSingleUser, updateUser, updateUserByAdmin, deleteUser }