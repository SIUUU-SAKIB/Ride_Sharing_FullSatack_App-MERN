import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";

const router = Router()

// User login (ALL USER)
router.post('/login', AuthController.credentialsLogin)
router.post('/logout', AuthController.logout)
router.patch('/change-password', authentication(...Object.values(IUserRole)), AuthController.changePassword)
router.post('/refresh-token', AuthController.refreshToken)
export const AuthRoutes = router