import { model, Schema, Types } from "mongoose";
import { IRide, PaymentStatus, RideStatus} from "./rides.interface";
import { IUserRole } from "../USER/user.interface";
import { IAdminRole } from "../ADMIN/admin.interface";
import { IRideLocation, RideRequestStatus } from "../RIDE REQUEST/rideRq.interface";


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

const RideSchema = new Schema<IRide>({
    riderId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    driverId: {
        type: Types.ObjectId,
        ref: "DriverProfile",
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
        required:true
    },
    paymentStatus:{
        type:String,
        enum:Object.values(PaymentStatus)
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
      enum: Object.values(IUserRole || IAdminRole),
    }

}, { 
    versionKey: false, timestamps: true
})

export const RidesDB = model<IRide>('Rides', RideSchema) 