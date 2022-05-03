import { Router } from "express";

import postRoute from "./post";
import eventRoute from "./event";

const router = Router();

router.use("/posts", postRoute);
router.use("/events", eventRoute);

export default router;
