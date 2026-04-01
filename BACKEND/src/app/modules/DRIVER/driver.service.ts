import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IDriverApplication, IStatus } from "./driver.interface";
import { DriverApplicationDB } from "./driver.model";
import { IUserRole } from "../USER/user.interface";
import { Types } from "mongoose";

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

    if (application && application.status === IStatus.PENDING) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Application already pending");
    }

    if (application && application.status === IStatus.APPROVED) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Already approved as driver");
    }

    const mainApplication = await DriverApplicationDB.create({
        ...payload,
        userId: _id as any
    });

    return mainApplication;
};

export const DriverServices = { driverApplication }