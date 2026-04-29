import { Router } from "express";
import { validateZodSchema } from "../../middleware/validate";
import { RidesValidation } from "./rides.validation";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";
import { RidesController } from "./ride.controller";

const router = Router()

router.patch(`/status/:id`,
    authentication(IUserRole.DRIVER),
    RidesController.updateRideStatus
)
export const RidesRouter = router