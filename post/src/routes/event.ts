import { Router } from "express";

import eventController from "../controllers/event";

const router = Router();

router.use("/", eventController.received);

export default router;
