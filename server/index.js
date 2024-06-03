import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./src/db.js";
import { app } from "./src/app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
