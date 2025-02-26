import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Like from "../models/likesModel.js";

const addLike = asyncHandler(async (req, res) => {
  const { blogId } = req.query;
  const user = req.user;

  const newLike = await Like.create({ blogId, userId: user._id });

  res.json(new ApiResponse(200, newLike, "post liked successfully"));
});

const removeLike = asyncHandler(async (req, res) => {
  const { blogId } = req.query;
  const user = req.user;

  const deleted = await Like.findOneAndDelete({ blogId, userId: user._id });

  if (deleted)
    res.json(new ApiResponse(200, user, "like removed successfully."));
  else throw new ApiError(404, "Like not found");
});

export { addLike, removeLike };
