import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { UserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "./user.interface";
import { object } from "zod";

const router = Router()

router.post('/create', validateZodSchema(UserZodSchema.createUser), UserController.createUser)
router.get('/all-user',authentication('ADMIN', 'SUPER_ADMIN'), UserController.getAllUser)

export const UserRoutes = router