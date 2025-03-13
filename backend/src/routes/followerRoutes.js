import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addFollower,
  removeFollower,
} from "../controllers/followerController.js";

const router = Router();

router.route("/").post(protect, addFollower).delete(protect, removeFollower);

export default router;
