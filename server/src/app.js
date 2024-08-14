import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { CORS_ORIGIN } from "./constant.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.on("error", (error) => {
  console.error("App ERROR: ", error);
  throw error;
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Routes import
import iceServerRouter from "./routes/iceserver.routes.js";
import healthRouter from "./routes/health.routes.js";
import jobRoutes from "./routes/jobs.routes.js";

// Routes declaration
app.use("/api/v1/ice_server", iceServerRouter);
app.use("/api/v1/health_check", healthRouter);
app.use("/api/v1/jobs", jobRoutes);

app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});

export { app };
