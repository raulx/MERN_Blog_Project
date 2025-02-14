import protect from "../middleware/authMiddleware.js";
import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getAuthorData,
  getUserBlogs,
  addComment,
  removeComment,
  editComment,
  authorReply,
  replyDelete,
  addFakeBlogs,
} from "../controllers/blogControllers.js";
import { getBlogs, getBlogData } from "../controllers/blogControllers.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/create").post(protect, upload.single("photo"), addBlog);
router.route("/getblogs").get(getBlogs);
router.route("/getBlogData").get(getBlogData);
router.route("/getAuthor").get(getAuthorData);
router.route("/getUserBlogs").get(protect, getUserBlogs);
router.route("/addComment").post(protect, addComment);
router.route("/deleteBlog").delete(protect, deleteBlog);
router.route("/removeComment").post(protect, removeComment);
router.route("/editComment").post(protect, editComment);
router.route("/authorReply").post(protect, authorReply);
router.route("/replyDelete").post(protect, replyDelete);

// fake data generation routes, must be commented in production

router.route("/addFakeBlogs").post(protect, addFakeBlogs);

export default router;
