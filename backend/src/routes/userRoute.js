import express from "express";

import {
  getUser,
  getAllUser,
  addFakerUser,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getuser").get(protect, getUser);

//for dev only
router.get("/allusers", getAllUser);
router.post("/addfakeuser", addFakerUser);

export default router;
