import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { DriverController } from "./driver.controller";
import { driverValidation } from "./driver.validation";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";

const router = Router()
router.post(`/apply/:userId`, validateZodSchema(driverValidation.driverApplicationZodSchema), DriverController.driverApplication)


export const DriverRoutes = router