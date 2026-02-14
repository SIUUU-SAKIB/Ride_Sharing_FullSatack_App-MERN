import z from "zod";

export const rideLocationZodSchema = z.object({
    lat: z.number({ message: "Latitude is required" }).min(-90).max(90),
    lng: z.number({ message: "Longitude is required" }).min(-90).max(90),
    address: z.string({ message: "Address is reqired" }).min(5).max(150)
})
export const rideRequestStatusEnum = z.enum([
    "PENDING",
    "MATCHED",
    "CANCELLED",
    'EXPIRED'

])
export const rideRequestZodSchema = z.object({
    riderId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    pickUpLocation: rideLocationZodSchema,
    dropOffLocation: rideLocationZodSchema,
    status: rideRequestStatusEnum,
    expiresAt: z.date()
})