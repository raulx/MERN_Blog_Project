import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addFollower,
  removeFollower,
} from "../controllers/followerController.js";

const router = Router();

router.route("/").post(protect, addFollower).delete(protect, removeFollower);

// DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

import { addFakeFollowers } from "../controllers/followerController.js";

router.route("/addFakeFollowers").post(addFakeFollowers);

export default router;
