import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  deleteComment,
  postComment,
} from "../controllers/commentController.js";

const router = Router();

router.route("/").post(protect, postComment).delete(protect, deleteComment);

// FOR DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

import {
  addFakeComment,
  addFakeReplies,
} from "../controllers/commentController.js";

router.route("/addFakeComment").post(addFakeComment);
router.route("/addFakeReplies").post(addFakeReplies);

// FOR DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

export default router;
