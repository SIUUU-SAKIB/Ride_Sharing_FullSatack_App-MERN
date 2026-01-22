import dotenv from "dotenv"
import createError from "../utils/createError"
import { StatusCodes } from "http-status-codes"

dotenv.config()

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] ?? defaultValue

    if (value === undefined) {
        throw new createError(
            StatusCodes.NOT_FOUND,
            `NO ENVIRONMENT VARIABLE FOUND: ${key} 😔`
        )
    }

    return value
}

export const enviromentVariables = {
    DATABASE_URL: getEnv("DATABASE_URL"),
    PORT: getEnv("PORT"),
    NODE_ENVIROMENT : getEnv('NODE_ENVIROMENT')
}
