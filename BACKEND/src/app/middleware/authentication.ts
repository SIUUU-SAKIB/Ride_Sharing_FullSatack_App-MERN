import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/createError";
import { verifyToken } from "../utils/jwt";
import { enviromentVariables } from "../config/env";
import { UserDB } from "../modules/USER/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";



export const authentication = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.cookies?.accessToken;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }

        const verifiedToken = verifyToken(accessToken, enviromentVariables.JWT_SECRET) as JwtPayload

     
        const isUserExist = await UserDB.findById(verifiedToken.userId)

        if (!isUserExist) {
            throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist")
        }
        // if (!isUserExist.isVerified) {
        //     throw new AppError(StatusCodes.BAD_REQUEST, "User is not verified")
        // }
        // if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        //     throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        // }
        // if (isUserExist.isDeleted) {
        //     throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
        // }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken
        console.log(req.user)
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}
