import { z } from "zod";
import { IVehicleType, IGender, IVehicleOwnsership } from "./driver.interface";

const driverApplicationZodSchema = z.object({

    licenseNumber: z
      .string({ message: "License number is required" })
      .min(5, "License number too short"),

    licenseImage: z
      .string({ message: "License image is required" }),

    vehicleNumber: z
      .string({ message: "Vehicle number is required" })
      .min(3, "Vehicle number too short"),

    vehicleType: z.enum(Object.values(IVehicleType)),

    nidNumber: z
      .string({ message: "NID number is required" })
      .min(6, "NID number too short"),

    phoneNumber: z
      .string({ message: "Phone number is required" })
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

    bloodType: z
      .string({ message: "Blood type is required" })
      .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood type"),

    address: z
      .string({ message: "Address is required" })
      .min(5, "Address too short"),

    gender: z.enum(Object.values(IGender)),

    vehicleOwnership: z.enum(
      Object.values(IVehicleOwnsership) 
    ),

});

export const driverValidation = {driverApplicationZodSchema}