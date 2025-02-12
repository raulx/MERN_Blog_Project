import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

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
    created_by: user._id,
  };

  const newBlogCreated = await Blog.create(newBlog);
  res.json({ newBlogCreated });
});

const getBlogs = asyncHandler(async (req, res) => {
  const { page, limit, category } = req.query;
  let data;

  if (category === "all" || !category) {
    data = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
          pipeline: [{ $project: { name: 1, _id: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          created_by: {
            $first: "$created_by",
          },
        },
      },

      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);
  } else {
    data = await Blog.aggregate([
      {
        $match: {
          category: category,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
          pipeline: [{ $project: { name: 1, _id: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          created_by: {
            $first: "$created_by",
          },
        },
      },

      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);
  }

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
  const { pageNumber } = req.query;

  if (!pageNumber)
    res.json({ status: 401, message: "pagenumber is required !" });

  const userBlogs = await Blog.aggregate([
    {
      $match: {
        created_by: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by",
        pipeline: [{ $project: { name: 1, profile_pic: 1, _id: 1 } }],
      },
    },
    {
      $addFields: {
        created_by: { $first: "$created_by" },
      },
    },
    { $skip: Number(pageNumber - 1) * 10 },
    { $limit: 10 },
  ]);

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

const removeComment = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.body;
  const updated = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );
  res.json({ updated });
});

const editComment = asyncHandler(async (req, res) => {
  const { commentId, newComment } = req.body;
  const updatedComment = await Blog.findOneAndUpdate(
    { "comments._id": commentId },
    { $set: { "comments.$.comment": newComment } },
    { new: true }
  );
  res.json({ data: updatedComment });
});

const authorReply = asyncHandler(async (req, res) => {
  const { reply, commentId } = req.body;
  const newReply = { reply };
  const newblog = await Blog.findOneAndUpdate(
    { "comments._id": commentId },
    { $push: { "comments.$.replies": newReply } },
    { new: true }
  );

  res.json({ newblog });
});

const replyDelete = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  const updatedBlog = await Blog.findOneAndUpdate(
    { "comments._id": commentId },
    {
      $set: {
        "comments.$.replies": [],
      },
    },
    { new: true }
  );
  res.json({ updatedBlog });
});

export {
  addBlog,
  getBlogs,
  getBlogData,
  getAuthorData,
  getUserBlogs,
  deleteBlog,
  addComment,
  removeComment,
  editComment,
  authorReply,
  replyDelete,
};

// fake data generation controllers must be commented in production

export const addFakeBlogs = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  const user = req.user;

  const categories = [
    "politics",
    "sports",
    "music",
    "travel",
    "finance & bussiness",
    "fashion & lifestyle",
    "food",
    "health",
    "science & technology",
  ];

  let totalCreated = 0;

  for (let i = 0; i < amount; i++) {
    const newBlog = {
      title: faker.lorem.sentence({ min: 5, max: 10 }),
      content: faker.lorem.paragraph({ min: 15, max: 75 }),

      category: categories[Math.floor(Math.random() * categories.length)],

      image: {
        public_id: faker.lorem.word(),
        remote_url: faker.image.urlLoremFlickr({ height: 400, width: 400 }),
      },
      created_by: user._id,
    };

    const createdBlog = await Blog.create(newBlog);
    if (createdBlog) totalCreated += 1;
  }

  res.json({ status: 200, totalCreated });
});
