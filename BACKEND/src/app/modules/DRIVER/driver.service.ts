import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IDriverApplication, IDriverStatus } from "./driver.interface";
import { DriverApplicationDB } from "./driver.model";
import { IUserRole } from "../USER/user.interface";
import mongoose, { Types } from "mongoose";

const driverApplication = async (_id: string, payload: IDriverApplication) => {
    const userId = new Types.ObjectId(_id)
    const user = await UserDB.findById(_id);

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
    }

    if (!user.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You are not verified yet");
    }

    if (user.role === IUserRole.DRIVER) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You are already a driver");
    }

    const application = await DriverApplicationDB.findOne(userId);

    if (application && application.status === IDriverStatus.PENDING) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Application already pending");
    }

    if (application && application.status === IDriverStatus.APPROVED) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Already approved as driver");
    }

    const mainApplication = await DriverApplicationDB.create({
        ...payload,
        userId: _id as any
    });

    return mainApplication;
};


const checkApplication = async (userId: string) => {
    const id = new mongoose.Types.ObjectId(userId)
    const user = await UserDB.findById(userId)
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
    }

    const application = await DriverApplicationDB.findOne({
        userId
    });

    if (!application) {
        return {
            status: null,
            message: "You have not applied yet"
        };
    }

    if (application.status === IDriverStatus.PENDING) {
        return {
            status: application.status,
            message: "Your application is still pending"
        };
    }

    if (application.status === IDriverStatus.REJECTED) {
        return {
            status: application.status,
            message: "Oops! Your application was rejected",
            reason: application.rejectionReason
        };
    }

    if (application.status === IDriverStatus.APPROVED) {
        return {
            status: application.status,
            message: "Congratulations 🎉 your application was approved"
        };
    }
};
export const DriverServices = { driverApplication, checkApplication}