import { Router } from "express";

import eventController from "../controllers/event";
const router = Router();

router.post("/", eventController.received);

export default router;
