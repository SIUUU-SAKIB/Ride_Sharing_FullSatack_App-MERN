
import { NextFunction, Request, Response } from "express"
import { enviromentVariables } from "../config/env"
import CreateError from "../utils/createError"
import multer from "multer"

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) => {

    let statusCode = 500
    let message = "Something Went Wrong!!"
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            statusCode = 400
            message = "Imiage size cannot exceed 200kb"
        } else {
            statusCode = 400
            message = err.message
        }
    }

    if (err instanceof CreateError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: enviromentVariables.NODE_ENVIROMENT === "development" ? err.stack : null
    })
}