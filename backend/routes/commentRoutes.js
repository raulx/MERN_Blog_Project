import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  deleteComment,
  postComment,
} from "../controllers/commentController.js";

const router = Router();

router.route("/").post(protect, postComment).delete(protect, deleteComment);

export default router;
