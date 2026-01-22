import mongoose from "mongoose"
import { enviromentVariables } from "./app/config/env"
import { Server } from "http"
import app from "./app"
let server: Server

const startServer = async () => {
    try {
        await mongoose.connect(enviromentVariables.DATABASE_URL)
        console.log("SERVER IS RUNNING ✅🚀")
        server = app.listen(enviromentVariables.PORT, () => {
            console.log(`Server is Listening to port http://localhost:${enviromentVariables.PORT} 🚀✅😍`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})