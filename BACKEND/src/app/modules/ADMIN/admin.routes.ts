import { Router } from "express";
import { IUserRole } from "../USER/user.interface";
import { AdminController } from "./admin.controller";
import { authentication } from "../../middleware/authentication";
import { AuthController } from "../AUTH/auth.controller";

 const router = Router()


 router.post(`/create`, authentication(IUserRole.SUPER_ADMIN), AdminController.createAdmin);
 router.get(`/verify-email`, AdminController.verifyEmail)

 export const AdminRoutes = router