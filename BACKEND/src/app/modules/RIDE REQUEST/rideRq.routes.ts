import { Router } from "express";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";
import { RideRequestController } from "./rideRq.controller";

const router = Router()

router.post(`/create`,
    authentication(IUserRole.RIDER),
    RideRequestController.rideRequest)

router.get(`/single_request/:id`,
    authentication(IUserRole.DRIVER, IUserRole.RIDER),
    RideRequestController.getSingleRideRequest)

router.patch('/accept-ride-request/:rideID',
    authentication(IUserRole.DRIVER),
    RideRequestController.acceptRideRequest)

export const RideRequestRouter = router