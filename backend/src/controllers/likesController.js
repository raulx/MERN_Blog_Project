import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Likes from "../models/likesModel.js";

const addLike = asyncHandler(async (req, res) => {
  const { blogId } = req.query;
  const user = req.user;

  const newLike = await Likes.create({ blogId, userId: user._id });

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

// FAKE DATA GENERATION
// FOR DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";
import View from "../models/viewModel.js";

export const addFakeLikes = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount) throw new ApiError(400, "amount field is required");

  let likesAdded = 0;

  for (let i = 0; i < amount; i++) {
    const userResult = await User.aggregate([{ $sample: { size: 1 } }]);
    const randomUser = userResult[0];
    const blogResult = await Blog.aggregate([{ $sample: { size: 1 } }]);
    const randomBlog = blogResult[0];

    const likeFound = await Likes.findOne({
      blogId: randomBlog._id,
      userId: randomUser._id,
    });

    if (!likeFound) {
      // first increment view
      await Blog.findByIdAndUpdate(
        randomBlog._id,
        { $inc: { views: 1 } }, // Increment the views by 1
        { new: true, runValidators: true }
      );

      await Likes.create({ userId: randomUser._id, blogId: randomBlog._id });
      await View.findOneAndReplace(
        { blogId: randomBlog._id, userId: randomUser._id },
        { blogId: randomBlog._id, userId: randomUser._id },
        { upsert: true }
      );
      likesAdded++;
    }
  }
  res.json(
    new ApiResponse(200, { likesAdded }, "fake likes added successfully")
  );
});
