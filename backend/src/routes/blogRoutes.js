import protect from "../middleware/authMiddleware.js";
import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getUserBlogs,
} from "../controllers/blogControllers.js";
import { getBlogs, getBlogData } from "../controllers/blogControllers.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/create").post(protect, upload.single("photo"), addBlog);
router.route("/getblogs").get(getBlogs);
router.route("/getBlogData").get(getBlogData);
router.route("/getUserBlogs").get(protect, getUserBlogs);
router.route("/deleteBlog").delete(protect, deleteBlog);

//DEV ONLY
// fake data generation routes, must be commented in production

import { addFakeViews, addFakeBlogs } from "../controllers/blogControllers.js";

router.route("/addFakeBlogs").post(addFakeBlogs);
router.route("/addFakeViews").post(addFakeViews);

export default router;
