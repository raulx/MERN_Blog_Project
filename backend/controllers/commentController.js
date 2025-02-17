import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/commentModel.js";

const postComment = asyncHandler(async (req, res) => {
  const { blogId, commentText, parentId } = req.body;
  const user = req.user;

  if (!blogId || !commentText)
    throw new ApiError(400, "All fields are required");

  const commentData = { blogId, userId: user._id, commentText };

  const newComment = await Comment.create(commentData);

  res.json(new ApiResponse(200, newComment, "comment posted successfully"));
});

export { postComment };
