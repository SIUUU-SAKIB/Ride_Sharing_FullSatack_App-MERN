import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { DriverController } from "./driver.controller";
import { driverValidation } from "./driver.validation";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";
import { upload } from "../../middleware/multer";

const router = Router()
router.post(`/apply`, upload.fields([
    { name: "licenseImage", maxCount: 5 },
    { name: "nidImage", maxCount: 5 },
    { name: "vehicleImage", maxCount: 5 }
]), authentication(...Object.values(IUserRole)), validateZodSchema(driverValidation.driverApplicationZodSchema), DriverController.driverApplication)


router.get(`/check-application`, authentication(IUserRole.RIDER), DriverController.checkApplication)
export const DriverRoutes = router