import { StatusCodes } from "http-status-codes"
import { IAuthProvider, IUser } from "./user.interface"
import AppError from "../../utils/createError"
import crypto from "crypto"
import { enviromentVariables } from "../../config/env"
import bcrypt from "bcryptjs"
import { UserDB } from "./user.model"
import { sendVerifyEmail } from "../../utils/sendEmail"
import cloudinary from "../../utils/cloudinary/cloudinary"

const createUser = async (payload: IUser) => {
    const { password, ...rest } = payload;
    const isUserExist = await UserDB.findOne({ email: payload.email });
    const token = crypto.randomBytes(32).toString("hex");
    
    const link = `http://localhost:${enviromentVariables.PORT}/api/v1/auth/verify-email?token=${token}`;

    if (isUserExist && isUserExist.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User already exists");
    }
    if (isUserExist && !isUserExist.isVerified) {
        if (
            isUserExist.verificationTokenExpires &&
            isUserExist.verificationTokenExpires > new Date()
        ) {
            throw new AppError(
                StatusCodes.TOO_MANY_REQUESTS,
                "Please wait before requesting another verification email"
            );
        }
        isUserExist.verificationToken = token;
        isUserExist.verificationTokenExpires = new Date(Date.now() + 5 * 60 * 1000);
        await isUserExist.save();
        await sendVerifyEmail(isUserExist.email, "Verify Email", link);
        return isUserExist;
    }

    let hashedPassword
    if (!isUserExist) {
        hashedPassword = await bcrypt.hash(
            password as string,
            Number(enviromentVariables.BCRYPT_SALT_ROUND)
        );
    }
    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: payload.email,
    };
    const user = await UserDB.create({
        ...rest,
        profilePhoto: payload.profilePhoto,
        profilePhotoId: payload.profilePhotoId,
        password: hashedPassword,
        auths: authProvider,
        verificationToken: token,
        verificationTokenExpires: new Date(Date.now() + 5 * 60 * 1000),
    });
    await sendVerifyEmail(user.email, "Verify Email", link);
    return user;
};
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


export const UserService = { createUser, updateUser }