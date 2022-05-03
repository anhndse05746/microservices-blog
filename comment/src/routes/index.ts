import { Router } from "express";

import commentRoute from "./comment";
import event from "./event";

const router = Router();

router.use("/", commentRoute);
router.use("/events", event);

export default router;
