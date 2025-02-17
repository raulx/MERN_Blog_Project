import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import { postComment } from "../controllers/commentController.js";

const router = Router();

router.route("/postComment").post(protect, postComment);

export default router;
