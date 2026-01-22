import { NextFunction, Request, Response } from "express";
import AppError from "../utils/createError";
import { StatusCodes } from "http-status-codes";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(StatusCodes.NOT_FOUND, `Route not found, ${req.originalUrl}`))
}