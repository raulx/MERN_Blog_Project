import asyncHandler from "express-async-handler";
import { ApiResponse } from "../utils/ApiResponse.js";

const addLike = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, {}, "post liked successfully"));
});

const removeLike = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, {}, "like removed successfully."));
});

export { addLike, removeLike };
