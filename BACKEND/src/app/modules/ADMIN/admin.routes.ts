import { Router } from "express";
import { IUserRole } from "../USER/user.interface";
import { AdminController } from "./admin.controller";
import { authentication } from "../../middleware/authentication";
import { AuthController } from "../AUTH/auth.controller";
import { IAdminRole } from "./admin.interface";

const router = Router()


router.post(`/create`, authentication(IAdminRole.SUPER_ADMIN), AdminController.createAdmin);
router.post(`/block/:_id`, authentication(IAdminRole.SUPER_ADMIN), AdminController.blockAdmin);
router.post(`/delete/:_id`, authentication(IAdminRole.SUPER_ADMIN), AdminController.deleteAdmin)
router.get(`/verify-email`, AdminController.verifyEmail)

export const AdminRoutes = router