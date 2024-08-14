import { Router } from "express";
import { iceServerController } from "../controllers/iceserver.controller.js";

const router = Router();

router.route("/get_credentials").get(iceServerController);

export default router;
