import z from "zod";
import { IUserRole } from "./user.interface";

const createUser = z.object({
    role: z.enum(Object.values(IUserRole.RIDER)).optional(),
    name: z.string().min(2, "Name must be at lest 2 character long."),
    email: z.string({ message: "Email required" }).email("Invalid email address"),
    phone: z.string({ message: "Phone number required" }).min(10).optional(),
    password: z.string({ message: "Password required" }).min(6)
})


const udpateUser = z.object({
    name: z.string().min(2, "Name must be at lest 2 character long.").optional(),
    phone: z.string({ message: "Phone number must be at least 10 digits" }).min(10).optional(),
    password: z.string().optional(),
    profilePhoto: z.string().optional()
})

const updatePassword = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6)
})
const updateUserByAdmin = z.object({
    role: z.enum(Object.values(IUserRole)),
    isActive: z.boolean().optional(),
    isVerified: z.boolean().optional(),
    profilePhoto: z.string().optional(),
    name: z.string().optional()
})
export const UserZodSchema = { createUser, udpateUser, updateUserByAdmin, updatePassword }