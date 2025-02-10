import { Router } from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/register", registerUser);

export default router;
