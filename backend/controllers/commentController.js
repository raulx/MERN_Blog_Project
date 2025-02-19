import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

const postComment = asyncHandler(async (req, res) => {
  const { blogId, commentText, parentId } = req.body;
  const user = req.user;

  if (!blogId || !commentText)
    throw new ApiError(400, "All fields are required");

  const commentData = { blogId, userId: user._id, commentText, parentId };

  const newComment = await Comment.create(commentData);

  const comment = await Comment.aggregate([
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
