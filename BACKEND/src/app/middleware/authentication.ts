import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/createError";
import { verifyToken } from "../utils/jwt";
import { enviromentVariables } from "../config/env";
import { UserDB } from "../modules/USER/user.model";
import { JwtPayload } from "jsonwebtoken";



export const authentication = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies?.accessToken || req.headers?.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }
        const verifiedToken = verifyToken(accessToken, enviromentVariables.JWT_SECRET) as JwtPayload
        const isUserExist = await UserDB.findById(verifiedToken._id)
        if (!isUserExist) {
            throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist")
        }
        if (!isUserExist.isVerified) {
            throw new AppError(StatusCodes.BAD_REQUEST, "User is not verified")
        }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}
