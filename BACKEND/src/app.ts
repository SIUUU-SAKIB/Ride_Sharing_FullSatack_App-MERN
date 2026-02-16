import express, { Request, Response, urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { StatusCodes } from "http-status-codes"

import AppError from "./app/utils/createError"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFoundHandler } from "./app/middleware/notFound"
import { UserRoutes } from "./app/modules/USER/user.routes"
import { AuthRoutes } from "./app/modules/AUTH/auth.route"
import session from "express-session"
import passport  from "passport";
import "./app/config/passport"
import { RideRoutes } from "./app/modules/RIDES/rides.route";
const app = express()
// google 

// app.use(
//     session({
//         secret: "supersecret",
//         resave: false,
//         saveUninitialized: false,
//     })
// )

app.use(passport.initialize())
// app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: true }))

app.use('/api/v1/user', UserRoutes)
app.use(`/api/v1/auth`, AuthRoutes)
app.use('/api/v1/rides', RideRoutes)
// Default Route
app.get('/api/v1', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        status: 'HEALTHY 🫡',
        message: "Ride Sharing Backend working perfectly.✅😍🚀",
    })
})

app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;