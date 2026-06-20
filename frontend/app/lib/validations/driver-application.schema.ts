import { z } from "zod"
import { IVehicleType, IGender, IVehicleOwnsership } from "@/app/_interfaces/driver.interface"

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const imageSchema = (fieldName: string) =>
    z
        .any()
        .transform((files) => files?.[0])
        .pipe(
            z
                .instanceof(File, {
                    message: `${fieldName} is required`,
                })
                .refine(
                    (file) => file.size <= MAX_FILE_SIZE,
                    `${fieldName} must be less than 2MB`
                )
                .refine(
                    (file) =>
                        ACCEPTED_IMAGE_TYPES.includes(file.type),
                    `${fieldName} must be JPEG, PNG, or WebP`
                )
        )

export const driverApplicationSchema = z.object({
    licenseNumber: z
        .string({ message: "License number is required" })
        .min(1, "License number is required")
        .min(5, "License number too short"),

    vehicleNumber: z
        .string({ message: "Vehicle number is required" })
        .min(1, "Vehicle number is required")
        .min(3, "Vehicle number too short"),
    licenseImage: imageSchema(`License image`),
    vehicleImage: imageSchema("Vehicle image"),

    vehicleType: z.enum(Object.values(IVehicleType) as [string, ...string[]], {
        message: "Please select a vehicle type",
    }),
    vehicleName: z.string({ message: "Vehicle name required" }).min(5, { message: "At least 5 characters required" }),
    nidNumber: z
        .string({ message: "NID number is required" })
        .min(1, "NID number is required")
        .min(6, "NID number too short"),

    phoneNumber: z
        .string({ message: "Phone number is required" })
        .min(1, "Phone number is required")
        .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

    bloodType: z
        .string({ message: "Blood type is required" })
        .min(1, "Blood type is required")
        .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood type (e.g. A+, O-)"),

    address: z
        .string({ message: "Address is required" })
        .min(1, "Address is required")
        .min(5, "Address too short"),

    gender: z.enum(Object.values(IGender), {
        message: "Please select a gender",
    }),

    vehicleOwnership: z.enum(Object.values(IVehicleOwnsership), {
        message: "Please select vehicle ownership",
    }),
    termsAccepted: z.boolean().refine(value => value === true, {
        message: "You must accept the Terms of Service"
    }
    )
})

export type DriverApplicationFormData = z.infer<typeof driverApplicationSchema>