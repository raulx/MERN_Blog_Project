import express from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logOutUser);

export default router;
