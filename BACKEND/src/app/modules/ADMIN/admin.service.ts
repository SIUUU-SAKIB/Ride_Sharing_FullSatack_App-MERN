import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/createError";
import { IAdmin } from "./admin.interface";
import { AdminDB } from "./admin.model";
import { enviromentVariables } from "../../config/env";
import { bcryptHashing } from "../../utils/bcrypt";
import crypto from "crypto"
const createAdmin = async (payload: Partial<IAdmin>) => {
    const {email, ...rest} = payload
    const admin = await AdminDB.findOne({ email: email })
    const token = crypto.randomBytes(32).toString(`hex`)
    if (admin) {
       throw new AppError(StatusCodes.NOT_FOUND, "Admin already exist")
    }
    const link = `http://localhost:${enviromentVariables.PORT}/auth/v1/verifyAdminEmail`
    const hashedPassword = bcryptHashing.hashPassword(payload.password as string)
    

    const result = await AdminDB.create(payload)
    return result
}