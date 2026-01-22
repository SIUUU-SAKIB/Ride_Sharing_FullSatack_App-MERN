import express, { Request, Response, urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { StatusCodes } from "http-status-codes"

import AppError from "./app/utils/createError"
import { globalErrorHandler } from "./app/middleware/globalErrorHandler"
import { notFoundHandler } from "./app/middleware/notFound"
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: true }))

// Default Route
app.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.ACCEPTED).json({
        status: 'HEALTHY 🫡',
        message: "Ride Sharing Backend working perfectly.✅😍🚀"
    })
})

app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;