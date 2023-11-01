import express from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
} from "../controllers/authController.js";
import { getUser, getAllUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.post("/register", registerUser);
router.route("/getuser").get(protect, getUser);

//for dev only
router.get("/allusers", getAllUser);

export default router;
