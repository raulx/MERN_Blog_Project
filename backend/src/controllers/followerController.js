import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Follower from "../models/followersModel.js";

const addFollower = asyncHandler(async (req, res) => {
  const user = req.user;
  const { followTo } = req.body;

  if (!followTo) throw new ApiError(400, "All fields are required.");

  const newFollow = await Follower.create({
    follower: user._id,
    following: followTo,
  });
  res.json(new ApiResponse(200, newFollow, "follower added successfully !"));
});

const removeFollower = asyncHandler(async (req, res) => {
  const user = req.user;
  const { followTo } = req.body;

  if (!followTo) throw new ApiError(400, "All fields are required.");

  const follow = await Follower.findOneAndDelete({
    follower: user._id,
    following: followTo,
  });
  res.json(new ApiResponse(200, follow, "follower removed successfully !"));
});

export { addFollower, removeFollower };
