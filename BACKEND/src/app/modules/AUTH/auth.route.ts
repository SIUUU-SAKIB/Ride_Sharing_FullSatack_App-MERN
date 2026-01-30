import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

// User login (ALL USER)
router.post('/login', AuthController.credentialsLogin)

export const AuthRoutes = router