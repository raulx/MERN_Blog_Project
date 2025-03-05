import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import { addLike, removeLike } from "../controllers/likesController.js";

const router = Router();

router.route("/").post(protect, addLike).delete(protect, removeLike);

export default router;
