import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const addBlog = asyncHandler(async (req, res) => {
  const { title, content, likes, category, public_id, remote_url } = req.body;
  const creator_id = req.token.userId;
  const newBlog = {
    title,
    content,
    likes,
    category,
    image: { public_id, remote_url },
    creator_id,
  };

  const newBlogCreated = await Blog.create(newBlog);
  res.json({ newBlogCreated });
});

const getBlogs = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const data = await Blog.find()
    .skip(page * limit)
    .limit(limit);
  res.status(200).json({ status: 200, data });
});

const getAuthorData = asyncHandler(async (req, res) => {
  const { authorId } = req.query;
  const author = await User.findById(authorId).select("-password");
  if (author) {
    res.json({ status: res.statusCode, data: author });
  } else {
    res.status(404);
    throw new Error("data not found");
  }
});
const getBlogData = asyncHandler(async (req, res) => {
  const { blogId } = req.query;
  const blog = await Blog.findById(blogId);
  if (blog) {
    blog.likes += 1;
    blog.save();
    res.json({ status: res.statusCode, data: blog });
  } else {
    res.status(404);
    throw new Error("data not found");
  }
});
const getUserBlogs = asyncHandler(async (req, res) => {
  const { userId } = req.token;
  const userBlogs = await Blog.find({ creator_id: userId });
  res.json({ status: req.status, data: userBlogs });
});

export { addBlog, getBlogs, getBlogData, getAuthorData, getUserBlogs };
