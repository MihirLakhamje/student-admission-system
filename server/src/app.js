import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

//routes import
import userRouter from "./routes/user.routes.js";
import programmeRouter from "./routes/programme.routes.js";
import applicationRouter from "./routes/application.routes.js";
import uploadRouter from "./routes/upload.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/programmes", programmeRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/uploads", uploadRouter);

export { app };
