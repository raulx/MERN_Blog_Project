import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addBlog, getAuthorData } from "../controllers/blogControllers.js";
import { getBlogs, getBlogData } from "../controllers/blogControllers.js";

const router = express.Router();
router.route("/create").post(protect, addBlog);
router.route("/getblogs").get(getBlogs);
router.route("/getBlogData").get(getBlogData);
router.route("/getAuthor").get(getAuthorData);

export default router;
