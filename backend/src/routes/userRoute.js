import express from "express";

import {
  getUser,
  getUserHistory,
  getUserLikes,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getuser").get(protect, getUser);
router.route("/getUserHistory").get(protect, getUserHistory);
router.route("/getUserLikes").get(protect, getUserLikes);

//FOR DEV ONLY,
// MUST BE COMMENTED IN PRODUCTION

import { addFakeUser } from "../controllers/userController.js";

router.post("/addfakeuser", addFakeUser);

export default router;
