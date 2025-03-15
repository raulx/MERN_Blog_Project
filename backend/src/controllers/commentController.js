import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import { faker } from "@faker-js/faker";

const postComment = asyncHandler(async (req, res) => {
  const { blogId, commentText, parentId } = req.body;
  const user = req.user;

  if (!blogId || !commentText)
    throw new ApiError(400, "All fields are required");

  const commentData = { blogId, userId: user._id, commentText, parentId };

  const newComment = await Comment.create(commentData);

  let comment;

  // if parentId present in request then that comment is a reply so send replyComment data back to frontend
  if (parentId) {
    comment = await Comment.aggregate([
      {
        $match: {
          _id: newComment._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "replyPostedBy",
          pipeline: [{ $project: { name: 1, email: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          replyPostedBy: { $first: "$replyPostedBy" },
        },
      },
      {
        $project: {
          userId: 0,
        },
      },
    ]);
  } else {
    comment = await Comment.aggregate([
      {
        $match: {
          _id: newComment._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "postedBy",
          pipeline: [{ $project: { name: 1, email: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          postedBy: { $first: "$postedBy" },
          replies: [],
        },
      },
      {
        $project: {
          userId: 0,
        },
      },
    ]);
  }

  res.json(new ApiResponse(200, comment[0], "comment posted successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const user = req.user;

  if (!id) throw new ApiError(400, "Comment Id is required !");

  const commentToBeDeleted = await Comment.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(id),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blogId",
        foreignField: "_id",
        as: "blog",
        pipeline: [{ $project: { created_by: 1 } }],
      },
    },
    {
      $addFields: {
        blog: { $first: "$blog" },
      },
    },
    {
      $project: {
        blogId: 0,
      },
    },
  ]);

  if (!commentToBeDeleted[0]) throw new ApiError(404, "Comment not found");

  // delete the comment if comment is posted by the user or if the blog for which the comment was made was  created by the user.
  if (
    user._id.toString() === commentToBeDeleted[0].userId.toString() ||
    user._id.toString() === commentToBeDeleted[0].blog.created_by.toString()
  ) {
    const commentDeleted = await Comment.findByIdAndDelete(id);

    // if top level comment is deleted (i.e comment with parentId:null) then also delete the replies for that comment
    if (commentDeleted.parentId === null) {
      await Comment.deleteMany({ parentId: commentDeleted._id });
    }

    res.json(
      new ApiResponse(200, commentDeleted, "comment deleted successfully !")
    );
  } else {
    throw new ApiError(401, "unauthorized");
  }
});

export { postComment, deleteComment };

// DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

import Blog from "../models/blogModel.js";
import View from "../models/viewModel.js";

export const addFakeComment = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount) throw new ApiError(400, "amount field is required.");

  for (let i = 0; i < amount; i++) {
    const userResult = await User.aggregate([{ $sample: { size: 1 } }]);
    const blogResult = await Blog.aggregate([{ $sample: { size: 1 } }]);
    const randomUser = userResult[0];
    const randomBlog = blogResult[0];

    const commentData = {
      blogId: randomBlog._id,
      userId: randomUser._id,
      commentText: faker.lorem.lines({ min: 1, max: 2 }),
    };

    await Comment.create(commentData);

    // first increment view
    await Blog.findByIdAndUpdate(
      randomBlog._id,
      { $inc: { views: 1 } }, // Increment the views by 1
      { new: true, runValidators: true }
    );

    // add/update view
    await View.findOneAndReplace(
      { blogId: randomBlog._id, userId: randomUser._id },
      { blogId: randomBlog._id, userId: randomUser._id },
      { upsert: true }
    );
  }
  res.json(new ApiResponse(200, {}, "fake comment added successfully"));
});

export const addFakeReplies = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount) throw new ApiError(400, "amount field is required.");

  for (let i = 0; i < amount; i++) {
    const userResult = await User.aggregate([{ $sample: { size: 1 } }]);
    const blogResult = await Blog.aggregate([{ $sample: { size: 1 } }]);
    const commentResult = await Comment.aggregate([
      {
        $match: {
          parentId: null,
        },
      },
      {
        $sample: {
          size: 1,
        },
      },
    ]);

    if (commentResult) {
      const randomUser = userResult[0];
      const randomBlog = blogResult[0];
      const randomComment = commentResult[0];

      const commentData = {
        blogId: randomBlog._id,
        userId: randomUser._id,
        commentText: faker.lorem.lines({ min: 1, max: 2 }),
        parentId: randomComment._id,
      };

      await Comment.create(commentData);

      // first increment view
      await Blog.findByIdAndUpdate(
        randomBlog._id,
        { $inc: { views: 1 } }, // Increment the views by 1
        { new: true, runValidators: true }
      );

      // add/update view
      await View.findOneAndReplace(
        { blogId: randomBlog._id, userId: randomUser._id },
        { blogId: randomBlog._id, userId: randomUser._id },
        { upsert: true }
      );
    }
  }

  res.json(new ApiResponse(200, {}, "fake replies addedd successfully"));
});
