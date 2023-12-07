import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const addBlog = asyncHandler(async (req, res) => {
  const { title, content, category, public_id, remote_url } = req.body;
  const creator_id = req.token.userId;
  const user = await User.findById(creator_id);
  const newBlog = {
    title,
    content,
    likes: 0,
    views: 0,
    category,
    image: { public_id, remote_url },
    created_by: {
      id: creator_id,
      profile_pic: user.profile_pic,
      name: user.name,
    },
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
    blog.views += 1;
    blog.save();
    res.json({ status: res.statusCode, data: blog });
  } else {
    res.status(404);
    throw new Error("data not found");
  }
});

const getUserBlogs = asyncHandler(async (req, res) => {
  const { userId } = req.token;
  const userBlogs = await Blog.find({ "created_by.id": userId });
  res.json({ status: req.status, data: userBlogs });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const user = await Blog.findById(blogId);
  await cloudinary.uploader.destroy(user.image.public_id);
  await Blog.findByIdAndDelete(blogId);
  res.json({ status: res.statusCode, message: "deleted blog successfully." });
});

const addComment = asyncHandler(async (req, res) => {
  const { blogId, comment, userId } = req.body;
  const blog = await Blog.findById(blogId);
  const user = await User.findById(userId);
  if (blog && user) {
    let newComment = {
      creator_id: userId,
      profile_pic: user.profile_pic,
      creator_name: user.name,
      comment: comment,
    };
    await blog.comments.push(newComment);
    blog.save();
    res.status(200).json({ blog, status: 200 });
  }
});

export {
  addBlog,
  getBlogs,
  getBlogData,
  getAuthorData,
  getUserBlogs,
  deleteBlog,
  addComment,
};
