import express, { Request, Response, urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { StatusCodes } from "http-status-codes"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFoundHandler } from "./app/middleware/notFound"
import { AuthRoutes } from "./app/modules/AUTH/auth.route"
import passport from "passport";
import "./app/config/passport"
import { DriverRoutes } from "./app/modules/DRIVER/driver.routes";
import { AdminRoutes } from "./app/modules/ADMIN/admin.routes";
import { UserRoutes } from "./app/modules/USER/user.routes";
import { RideRequestRouter } from "./app/modules/RIDE REQUEST/rideRq.routes";
import { RidesRouter } from "./app/modules/RIDES/rides.route";

const app = express()

// MIDDLEWARES------------------------
app.use(passport.initialize())
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: true }))

// ROUTES------------------------------
app.use('/api/v1/user', UserRoutes)
app.use(`/api/v1/auth`, AuthRoutes)
app.use(`/api/v1/driver`, DriverRoutes)
app.use('/api/v1/admin', AdminRoutes)
app.use('/api/v1/ride-request', RideRequestRouter)
app.use(`/api/v1/rides`, RidesRouter)


// DEFAULT ROUTE--------------------
app.get('/api/v1', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        status: 'HEALTHY 🫡',
        message: "Ride Sharing Backend working perfectly.✅😍🚀",
    })
})

// ERROR HANDLERS----------------------
app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;