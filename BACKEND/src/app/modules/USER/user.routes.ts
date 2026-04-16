import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { UserZodSchema } from "./user.validation";
import { upload } from "../../middleware/multer";
import { UserController } from "./user.controller";
import { authLimiter } from "../../middleware/authLimiter";
const router = Router()

router.post('/create',
    authLimiter,
    upload.single('file'),
    validateZodSchema(UserZodSchema.createUser),
    UserController.createUser)

router.patch('/update-profile/:id', upload.single("file"), validateZodSchema(UserZodSchema.udpateUser), UserController.updateUser)

export const UserRoutes = router