import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Follower from "../models/followersModel.js";
import User from "../models/userModel.js";

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

// DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

export const addFakeFollowers = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount) throw new ApiError(400, "amount field is required");

  let followerCreated = 0;

  for (let i = 0; i < amount; i++) {
    const result1 = await User.aggregate([{ $sample: { size: 1 } }]);
    const result2 = await User.aggregate([{ $sample: { size: 1 } }]);

    const follower = result1[0];
    const following = result2[0];

    const alreadyFollowing = await Follower.findOne({
      follower: follower._id,
      following: following._id,
    });

    if (!alreadyFollowing) {
      await Follower.create({ follower, following });
      followerCreated++;
    }
  }
  res.json(new ApiResponse(200, { followerCreated }, "fake followers added"));
});
