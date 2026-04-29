import { model, Schema } from "mongoose";
import { IRideLocation, IRideRequest, PaymentMethod, RideRequestStatus } from "./rideRq.interface";
import { IVehicleType } from "../DRIVER/driver.interface";


const locationSchema = new Schema<IRideLocation>({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
}, { _id: false });

const RideRequestSchema = new Schema<IRideRequest>({
    riderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, driverId: {
         type: Schema.Types.ObjectId,
        ref: "DriverProfile"
    },
    pickupLocation: {
        type: locationSchema,
        required: true
    },
    dropoffLocation: {
        type: locationSchema,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(RideRequestStatus),
        default: RideRequestStatus.PENDING
    },
    payment: {
        type: String,
        enum: Object.values(PaymentMethod),
        default: PaymentMethod.CASH
    },
    vehicleRequest: {
        type: String,
        enum: Object.values(IVehicleType),
        required: true
    },
    estimatedPassengers: {
        type: Number,
        required: true,
        default: 1
    },
    distanceKM: {
        type: Number
    },
    estimatedFare: {
        type: Number,
        required: true
    },
    specificInstruction: {
        type: String
    },
    expiresAt: {
        type: Date,
        required: true
    },
    cancelledAt: {
        type: Date
    },
    fulfilledAt: {
        type: Date
    },

}, {
    versionKey: false,
    timestamps: true
})

export const RideRequestDB = model("RideRequest", RideRequestSchema)