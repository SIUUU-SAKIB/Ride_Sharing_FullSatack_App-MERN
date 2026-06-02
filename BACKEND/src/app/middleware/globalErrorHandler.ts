
import { NextFunction, Request, Response } from "express"
import { enviromentVariables } from "../config/env"
import CreateError from "../utils/createError"
import multer from "multer"
import {
    JsonWebTokenError,
    TokenExpiredError
} from "jsonwebtoken"
export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) => {

    let statusCode = 500
    let message = "Something Went Wrong!!"
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            statusCode = 401
            message = "Imiage size cannot exceed 200kb"
        } else {
            statusCode = 401
            message = err.message
        }
    }
    else if (err instanceof TokenExpiredError) {
        statusCode = 401
        message = "Access token expired"
    }
    else if (err instanceof JsonWebTokenError) {
        statusCode = 401
        message = "Invalid token"
    }
    else if (err instanceof CreateError) {
        statusCode = err.statusCode
        message = err.message
    }
    else if (err instanceof Error) {
        statusCode = 500
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: enviromentVariables.NODE_ENVIROMENT === "development" ? err.stack : null
    })
}