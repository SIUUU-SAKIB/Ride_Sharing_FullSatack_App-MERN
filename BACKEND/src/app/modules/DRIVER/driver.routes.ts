import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { DriverController } from "./driver.controller";
import { driverValidation } from "./driver.validation";

const router = Router()
router.post(`/apply`, validateZodSchema(driverValidation.driverApplicationZodSchema), DriverController.driverApplication)


export const DriverRoutes = router