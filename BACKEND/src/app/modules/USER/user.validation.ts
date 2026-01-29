import z from "zod";
import { IUserRole } from "./user.interface";

 const createUser = z.object({
    role: z.enum(Object.values(IUserRole)).optional(),
    name: z.string().min(2),
    email: z.string({ message: "Email required" }).email(),
    phone: z.string({ message: "Phone number required" }).min(10),
    password: z.string({ message: "Password required" }).min(6),
})

export const UserZodSchema = {createUser}