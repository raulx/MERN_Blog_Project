import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import { addLike, removeLike } from "../controllers/likesController.js";

const router = Router();

router.route("/").post(protect, addLike).delete(protect, removeLike);

// FAKE DATA GENERATION
// FOR DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

import { addFakeLikes } from "../controllers/likesController.js";

router.route("/addFakeLikes").post(addFakeLikes);

export default router;
