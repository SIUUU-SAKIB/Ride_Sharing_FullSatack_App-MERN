import { NextFunction, Request, Response } from "express"
import { ZodAny, ZodObject } from "zod"

export const validateZodSchema = (zodSchema: ZodObject
) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let parsedBody = req.body || {}
        if (req.body?.data) {
            parsedBody = JSON.parse(req.body.data)
        }
        req.body = await zodSchema.parseAsync(parsedBody)
        next()
    } catch (error) {
        next(error)
    }
}