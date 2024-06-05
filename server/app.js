import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
})


//routes import
import userRouter from "./src/routes/user.routes.js";
import programmeRouter from "./src/routes/programme.routes.js";
import applicationRouter from "./src/routes/application.routes.js";
import uploadRouter from "./src/routes/upload.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/programmes", programmeRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/uploads", uploadRouter);

export { app };
