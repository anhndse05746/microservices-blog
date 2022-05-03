import { Router } from "express";
import postController from "../controllers/post";
const router = Router();

router.get("/", postController.get);
router.post("/", postController.create);

export default router;
