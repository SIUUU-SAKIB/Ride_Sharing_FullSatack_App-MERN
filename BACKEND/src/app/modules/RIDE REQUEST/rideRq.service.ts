import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { UserDB } from "../USER/user.model";
import { IRideRequest } from "./rideRq.interface";

const RideRequest = async(riderId:string, payload:Partial<IRideRequest>) => {
const rider = await UserDB.findById(riderId)
if(!rider) {
    throw new AppError(StatusCodes.NOT_FOUND, "Rider does not exist")
}

}

export const RideRequestService = {RideRequest}