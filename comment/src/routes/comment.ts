import { Router } from "express";
import commentController from "../controllers/comment";
const router = Router();

router.get("/posts/:id/comments", commentController.get);
router.post("/posts/:id/comments", commentController.create);
export default router;
