import bcrypt from "bcryptjs"

import { enviromentVariables } from "../config/env"
const hashPassword = async(password: string) => {
    return await bcrypt.hash(password, Number(enviromentVariables.BCRYPT_SALT_ROUND))
}

export const bcryptHashing  = {hashPassword}