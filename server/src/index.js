import "dotenv/config.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { APP_PORT } from "./constant.js";

dotenv.config({
  path: "./env",
});

const PORT = APP_PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running at ${PORT}`);
    });
  })
  .catch((err) => console.error("MONGO_DB connection failed", err));
