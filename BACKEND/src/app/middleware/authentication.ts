import { NextFunction, Request, Response } from "express";
import AppError from "../utils/createError";
import { verifyToken } from "../utils/jwt";
import { enviromentVariables } from "../config/env";
import { UserDB } from "../modules/USER/user.model";
import { JwtPayload } from "jsonwebtoken";
import { AdminDB } from "../modules/ADMIN/admin.model";
import { StatusCodes } from "http-status-codes";


export const authentication =
    (...authRoles: string[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const token =
                    req.cookies?.accessToken ||
                    req.headers.authorization?.split(" ")[1];

                if (!token) {
                    throw new AppError(403, "No token received");
                }
                const verifiedToken = verifyToken(
                    token,
                    enviromentVariables.JWT_SECRET
                ) as JwtPayload;


                let user = await UserDB.findById(verifiedToken._id);
                let admin = null;

                if (!user) {
                    admin = await AdminDB.findById(verifiedToken._id);
                }
                if (!user && !admin) {
                    throw new AppError(400, "User does not exist");
                }

                if (user) {
                    if (!user.isVerified)
                        throw new AppError(400, "User not verified");
                    if (user.isBlocked)
                        throw new AppError(400, "User is blocked");
                    if (!user.isActive)
                        throw new AppError(400, "User not active");
                    if (user.isDeleted) {
                        throw new AppError(400, "User deleted")
                    }
                }
                if (admin) {
                    if (!admin.isVerified)
                        throw new AppError(400, "Admin not verified");
                    if (admin.isBlocked)
                        throw new AppError(400, "Admin is blocked");
                    if (!admin.isActive)
                        throw new AppError(400, "Admin not active");
                    if (admin.isDeleted)
                        throw new AppError(400, "Admin deleted");
                }
                if (!authRoles.includes(verifiedToken.role)) {
                    throw new AppError(StatusCodes.BAD_REQUEST, "You are not permitted to view this route")
                }

                req.user = {
                    _id: verifiedToken._id,
                    role: verifiedToken.role,
                    type: user ? "user" : "admin"
                };
                next();
            } catch (error) {
                console.log("jwt error", error);
                next(error);
            }
        };