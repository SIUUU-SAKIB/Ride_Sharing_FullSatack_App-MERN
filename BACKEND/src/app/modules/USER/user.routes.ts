import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { UserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "./user.interface";


const router = Router()

// Create User (ALL USER)
router.post('/create', validateZodSchema(UserZodSchema.createUser), UserController.createUser)


// Get all user (ADMIN/SUPER_ADMIN)
router.get('/all-user', authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.getAllUser)

// Get user by role (ADMIN/SUPER_ADMIN)
router.get(`/get-user-by-role/:role`, authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.getUserByRole)

export const UserRoutes = router