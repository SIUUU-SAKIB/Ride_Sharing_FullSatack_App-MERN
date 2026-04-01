import { model, Schema, Types } from "mongoose";
import { IRide, IRideLocation, IRideRequest, PaymentStatus, RideRequestStatus, RideStatus } from "./rides.interface";
import { IUserRole } from "../USER/rider.interface";


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
RideRequestSchema.index({expiresAt:1})


const RideSchema = new Schema<IRide>({
    riderId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    driverId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    pickupLocation: {
        type: RideLocationSchema,
        required: true
    },
    dropoffLocation: {
        type: RideLocationSchema,
        required: true
    },
    distanceKM:{
        type:Number,
        min:0
    },estimatedFare: {
      type: Number,
      min: 0,
    },

    finalFare: {
      type: Number,
      min: 0,
    },
    status:{
        type:String,
        enum:Object.values(RideStatus),
        default:RideStatus.REQUESTED,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:Object.values(PaymentStatus),
        required:true
    },
    requestedAt:{
        type:Date,
        required:true
    },
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
    cancelledAt: Date,

    cancelledBy: {
      type: String,
      enum: Object.values(IUserRole),
    }

}, {
    versionKey: false, timestamps: true
})

export const RidesRQDB = model<IRideRequest>('RidesRQ', RideRequestSchema) 