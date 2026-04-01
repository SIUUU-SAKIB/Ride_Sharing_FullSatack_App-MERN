import { Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/rider.interface";
import passport from "passport";
import { enviromentVariables } from "../../config/env";

const router = Router()

// User login (ALL USER)
router.post('/login', AuthController.credentialsLogin)
router.get(`/me`,authentication(...Object.values(IUserRole)), AuthController.getMe)
router.post('/logout', AuthController.logout)
router.post('/refresh-token', AuthController.refreshToken)
router.get(`/forget-password`, AuthController.forgetPassword)
router.patch(`/change-password`, AuthController.changePassword)
router.post(`/reset-password`, AuthController.resetPassword)

router.get(`/verify-email`, AuthController.verifyEmail)
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
)

// Callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    (req: Request, res: Response) => {
        const { user, token } = req.user as any
        res.redirect(`${enviromentVariables.FRONTEND_URL}/auth/success?token=${token}`)
    }
)
export const AuthRoutes = router

