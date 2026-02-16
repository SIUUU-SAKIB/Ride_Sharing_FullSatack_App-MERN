import { Router } from "express";
import { IUserRole } from "../USER/user.interface";
import { RidesController } from "./ride.controller";
import { authentication } from "../../middleware/authentication";

const router = Router()
router.post('/create-ride-request', authentication(IUserRole.RIDER), RidesController.createRideRequest)

export const RideRoutes = router