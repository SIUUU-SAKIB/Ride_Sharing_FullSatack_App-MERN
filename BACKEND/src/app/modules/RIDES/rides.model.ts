import mongoose, { model, Schema } from "mongoose";
import { IRideLocation, IRideRequest, RideRequestStatus } from "./rides.interface";


export const RideLocationSchema = new Schema<IRideLocation>({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
}, {
    _id: false,
    versionKey: false
})
export const RideRequestSchema = new Schema<IRideRequest>(
    {
        riderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        pickupLocation: {
            type: RideLocationSchema,
            required: true
        },
        dropOffLocation: {
            type: RideLocationSchema,
            required: true
        },
        status: {
            type: String,
            enum: Object.values(RideRequestStatus),
            default: RideRequestStatus.PENDING
        },
        expiresAt: {
            type: Date,
            required: true,
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const RidesRQDB = model('RidesRQ', RideRequestSchema)