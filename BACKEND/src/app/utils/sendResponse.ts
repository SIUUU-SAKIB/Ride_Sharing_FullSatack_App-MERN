import { Response } from "express"

interface SendResponseOptions<T> {
    statusCode: number,
    success?: boolean,
    message?: string,
    data?: T,
    meta?: {
        page?: number,
        limit?: number,
        total?: number,
        totalPage?:number
    }
}

const sendResponse = <T>(
    res: Response,
    options: SendResponseOptions<T>
) => {
    const {
        statusCode,
        success = true,
        message,
        data, meta
    } = options

    res.status(statusCode).json({
        success,
        message,
        meta, 

        data
    })
}

export default sendResponse;