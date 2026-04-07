import { Router } from "express";
import { authenticate } from "passport";
import { IUserRole } from "../USER/user.interface";
import { AdminController } from "./admin.controller";

 const router = Router()


 router.post(`/create`, authenticate(IUserRole.SUPER_ADMIN), AdminController.createAdmin)

 export const AdminRoutes = router