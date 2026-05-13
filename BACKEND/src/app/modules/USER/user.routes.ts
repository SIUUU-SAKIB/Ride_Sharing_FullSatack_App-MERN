import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { UserZodSchema } from "./user.validation";
import { upload } from "../../middleware/multer";
import { UserController } from "./user.controller";
import { authLimit } from "../../middleware/authLimiter";
const router = Router()

router.post('/create',
    authLimit.registerLimiter,
    upload.single('profileImage'),
    validateZodSchema(UserZodSchema.createUser),
    UserController.createUser)

router.patch('/update-profile/:id', upload.single("profileImage"), validateZodSchema(UserZodSchema.udpateUser), UserController.updateUser)

export const UserRoutes = router