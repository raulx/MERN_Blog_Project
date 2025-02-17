import protect from "../middleware/authMiddleware.js";
import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getUserBlogs,
  addFakeBlogs,
} from "../controllers/blogControllers.js";
import { getBlogs, getBlogData } from "../controllers/blogControllers.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/create").post(protect, upload.single("photo"), addBlog);
router.route("/getblogs").get(getBlogs);
router.route("/getBlogData").get(getBlogData);
router.route("/getUserBlogs").get(protect, getUserBlogs);
router.route("/deleteBlog").delete(protect, deleteBlog);

// fake data generation routes, must be commented in production

router.route("/addFakeBlogs").post(protect, addFakeBlogs);

export default router;
