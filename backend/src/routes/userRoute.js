import express from "express";

import { getUser } from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getuser").get(protect, getUser);

//FOR DEV ONLY,
// MUST BE COMMENTED IN PRODUCTION

import { addFakeUser } from "../controllers/userController.js";

router.post("/addfakeuser", addFakeUser);

export default router;
