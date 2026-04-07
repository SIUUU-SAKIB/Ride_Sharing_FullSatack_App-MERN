import { Router } from "express";
import { authenticate } from "passport";
import { IUserRole } from "../USER/user.interface";
import { AdminController } from "./admin.controller";
import { authentication } from "../../middleware/authentication";

 const router = Router()


 router.post(`/create`, authentication(IUserRole.SUPER_ADMIN), AdminController.createAdmin)

 export const AdminRoutes = router