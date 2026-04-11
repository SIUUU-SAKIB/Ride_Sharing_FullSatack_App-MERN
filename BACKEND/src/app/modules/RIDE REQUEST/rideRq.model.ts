import { model, Schema } from "mongoose";
import { IRideRequest, RideRequestStatus } from "./rideRq.interface";
import { IRideLocation} from "../RIDES/rides.interface";


export const RideRequestSchema = new Schema<IRideRequest>(
    {
        riderId: {
            tyep: Schema.Types.ObjectId,
            required: true
        },
        pickUpLocation: {
            type: String,
            enum: Object.values(IRideLocation),
            required: true
        }, dropOffLocation: {
            type: String,
            enum: Object.values(IRideLocation),
            required: true
        },
        status: {
            type: String,
            enum: Object.values(RideRequestStatus)
        },
        expiresAt: {
            type: Date,
        },
        cancelledAt: {
            type: Date
        },
        createdAt: {
            type: Date
        },
        updatedAt: {
            type: Date
        }
    }
)

export const ridesReqDB = model<IRideRequest>('RideRequests', RideRequestSchema)