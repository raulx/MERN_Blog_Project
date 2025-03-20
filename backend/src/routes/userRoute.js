import express from "express";

import {
  getUserProfile,
  getUserHistory,
  getUserLikes,
  getAuthorProfile,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getUserProfile").get(protect, getUserProfile);
router.route("/getUserHistory").get(protect, getUserHistory);
router.route("/getUserLikes").get(protect, getUserLikes);
router.route("/getAuthorProfile").get(protect, getAuthorProfile);

//FOR DEV ONLY,
// MUST BE COMMENTED IN PRODUCTION

import { addFakeUser } from "../controllers/userController.js";

router.post("/addfakeuser", addFakeUser);

export default router;
