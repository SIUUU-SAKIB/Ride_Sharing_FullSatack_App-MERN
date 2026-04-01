import { Router } from "express";
import { IUserRole } from "../USER/rider.interface";
import { RidesController } from "./ride.controller";
import { authentication } from "../../middleware/authentication";

const router = Router()
router.post('/create-ride-request', authentication(IUserRole.RIDER), RidesController.createRideRequest)

router.get('/get-all-pending-rides', authentication(IUserRole.DRIVER), RidesController.getAllRideRequest)

router.patch('/cancel-ride/:rideRqId', authentication(IUserRole.RIDER), RidesController.cancelRideRequest)
export const RideRoutes = router