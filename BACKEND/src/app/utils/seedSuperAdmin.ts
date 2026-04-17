import { StatusCodes } from "http-status-codes"
import { enviromentVariables } from "../config/env"
import { UserDB } from "../modules/USER/user.model"
import bcrypt from "bcryptjs";
import { IAuthProvider} from "../modules/USER/user.interface";
import { IAdmin, IAdminRole } from "../modules/ADMIN/admin.interface";
import { AdminDB } from "../modules/ADMIN/admin.model";
export const seedSuperAdmin = async () => {
    try {
        const email = enviromentVariables.SUPER_ADMIN_EMAIL
        const password = enviromentVariables.SUPER_ADMIN_PASSWORD
        const isSuperAdminExist = await AdminDB.findOne({ email })
        if (isSuperAdminExist) {
            return
        }
        const hashedPassword = await bcrypt.hash(password, Number(enviromentVariables.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: email
        }
        const payload: IAdmin = {
            name: "Super Admin",
            role: IAdminRole.SUPER_ADMIN,
            email: email,
            password: hashedPassword,
            isVerified: true
        }
        const super_admin = await AdminDB.create(payload)
        console.log('Super_admin created successfully 😍')
        return super_admin
    } catch (err) {
        console.log("Something went wrong while creating SUPER_ADMIN" + err)
    }
}

