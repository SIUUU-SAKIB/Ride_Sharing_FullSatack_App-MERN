import { Router } from "express";
import { authentication } from "../../middleware/authentication";
import { IUserRole } from "../USER/user.interface";
import { RideRequestController } from "./rideRq.controller";

const router = Router()
router.post(`/create`, authentication(IUserRole.RIDER), RideRequestController.rideRequest)