import { StatusCodes } from "http-status-codes"
import { enviromentVariables } from "../config/env"
import { UserDB } from "../modules/USER/user.model"
import AppError from "./createError"
import bcrypt from "bcryptjs";
import { IAuthProvider, IUser, IUserRole } from "../modules/USER/user.interface";
export const seedSuperAdmin = async () => {
    try {
        const email = enviromentVariables.SUPER_ADMIN_EMAIL
        const password = enviromentVariables.SUPER_ADMIN_PASSWORD

        const isSuperAdminExist = await UserDB.findOne({ email })

        if (isSuperAdminExist) {
            console.log('super_admin already exist')
            return

        }
        const hashedPassword = await bcrypt.hash(password, Number(enviromentVariables.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: email
        }
        const payload: IUser = {
            name: "Super Admin",
            role: IUserRole.SUPER_ADMIN,
            email: email,
            password: hashedPassword,
            isVerified: true,
            auths: authProvider
        }
        const super_admin = await UserDB.create(payload)
        console.log('Super_admin created successfully 😍')
        return super_admin
    } catch (err) {
        console.log("Something went wrong while creating SUPER_ADMIN" + err)
    }
}

