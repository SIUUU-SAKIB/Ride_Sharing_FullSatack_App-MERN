import z from "zod";
import { IAdminRole } from "./admin.interface";

const zodSchema = z.object({
    name: z.string({ message: `Name is required` }).min(3).max(50),
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string({ message: "Password is required" }),
    role: z.enum(Object.values(IAdminRole)),
    phone: z.string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
        .optional().or(z.literal(''))
}).strict()

const updateZodSchema = z.object({
    name: z.string({ message: `Name is required` }).min(3).max(50).optional(),
    email: z.string().email({ message: "Invalid Email" }).optional(),
    password: z.string({ message: "Password is required" }).optional(),
    role: z.enum(Object.values(IAdminRole)).optional(),
    phone: z.string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number")
        .optional(),
    isVerified: z.boolean().optional(),
    isActive: z.boolean().optional()
}).strict()

export const AdminValidation = { zodSchema, updateZodSchema }