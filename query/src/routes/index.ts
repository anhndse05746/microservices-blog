import { Router } from "express";
import controllers from "../controllers";

const router = Router();

router.post("/events", controllers.eventsReceived);

router.get("/posts", controllers.getPosts);

export default router;
