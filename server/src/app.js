import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import programmeRouter from './routes/programme.routes.js'
import applicationRouter from './routes/application.routes.js'
import uploadRouter from './routes/upload.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/programmes", programmeRouter)
app.use("/api/v1/applications", applicationRouter)
app.use("/api/v1/uploads", uploadRouter)

export { app }