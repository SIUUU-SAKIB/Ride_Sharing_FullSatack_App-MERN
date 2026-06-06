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
    { name: "vehicleImage", maxCount: 5 }
]), authentication(IUserRole.RIDER), validateZodSchema(driverValidation.driverApplicationZodSchema), DriverController.driverApplication)


// REAPPLY
router.patch(`/reapply`, upload.fields([
    { name: "licenseImage", maxCount: 5 },
    { name: "nidImage", maxCount: 5 },
    { name: "vehicleImage", maxCount: 5 }
]), authentication(IUserRole.RIDER), validateZodSchema(driverValidation.driverApplicationZodSchema), DriverController.reapply)
router.get(`/check-application`, authentication(IUserRole.RIDER), DriverController.checkApplication)
export const DriverRoutes = router