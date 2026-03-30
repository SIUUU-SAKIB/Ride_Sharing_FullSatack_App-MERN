import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { UserZodSchema } from "./user.validation";
import { UserController } from "./user.controller";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "./user.interface";
import { upload } from "../../middleware/multer";


const router = Router()

router.post('/create', upload.single('file'), validateZodSchema(UserZodSchema.createUser), UserController.createUser)
router.get('/all-user', authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.getAllUser)

router.get(`/get-user-by-role/:role`, authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.getUserByRole)

router.get(`/get-single-user/:id`, authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.getSingleUser)

router.patch('/update-profile/:id', upload.single("file"), validateZodSchema(UserZodSchema.udpateUser), UserController.updateUser)

router.patch('/update-by-admin/:id', authentication(IUserRole.ADMIN, IUserRole.SUPER_ADMIN), UserController.updateUserByAdmin)

router.delete('/delete/:id', authentication(IUserRole.ADMIN), UserController.deleteUser)
export const UserRoutes = router