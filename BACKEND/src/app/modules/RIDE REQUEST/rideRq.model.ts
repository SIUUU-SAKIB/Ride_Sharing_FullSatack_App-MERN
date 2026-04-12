import { model, Schema } from "mongoose";
import { IRideRequest, RideRequestStatus } from "./rideRq.interface";

const locationSchema = new Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
}, { _id: false });

export const RideRequestSchema = new Schema<IRideRequest>(
    {
        riderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: "Driver",
            required: false
        },
        pickUpLocation: {
            type: locationSchema,
            required: true
        },
        dropOffLocation: {
            type: locationSchema,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(RideRequestStatus),
            default: RideRequestStatus.PENDING
        },
        expiresAt: {
            type: Date,
            required: true
        },
        cancelledAt: {
            type: Date
        }
    }, {
    timestamps: true,
    versionKey: false
}
)

export const ridesReqDB = model<IRideRequest>('RideRequests', RideRequestSchema)