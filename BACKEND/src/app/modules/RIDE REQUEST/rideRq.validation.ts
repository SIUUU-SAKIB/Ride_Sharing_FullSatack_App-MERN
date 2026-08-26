import { z } from "zod";
import { PaymentMethod, RideRequestStatus } from "./rideRq.interface";

const locationZodSchema = z.object({
  lat: z.number({ message: "Latitude is required" }),
  lng: z.number({ message: "Longitude is required" }),
  address: z.string({ message: "Address is required" })
})

const createRideRequestZodSchema = z.object({
  riderId: z.string({ message: "Rider ID is required" }),
  pickupLocation: locationZodSchema,
  dropoffLocation: locationZodSchema,
  paymentMethod: z.enum(PaymentMethod).optional(),
  vehicleRequest: z.string({ message: "Vehicle type is required." }),
  estimatedPassengers: z.number().min(1).optional(),
  estimatedFare: z.number({ message: "Estimated fare is required" }).min(0),
  specificInstruction: z.string().optional(),
  expiresAt: z.coerce.date({ message: "Expiry time is required" })
})

const updateRideRequestZodSchema = z.object({
  status: z.enum(RideRequestStatus).optional(),
  driverId: z.string().optional(),
  cancelledAt: z.coerce.date().optional(),
  fulfilledAt: z.coerce.date().optional()
});

export const RideRequestValidation = {
  createRideRequestZodSchema,
  updateRideRequestZodSchema
};