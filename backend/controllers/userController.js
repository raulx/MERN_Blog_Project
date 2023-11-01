import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getUser = asyncHandler(async (req, res) => {
  const userId = req.token.userId;
  const userFound = await User.findOne({ _id: userId }).select("-password");
  if (userFound) {
    res.status(200).json({ status: 200, data: userFound });
  } else {
    res.status(404);
    throw new Error("User not Found !");
  }
});
//FOR DEV ONLY
const getAllUser = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  res.json({ status: 200, data: allUsers });
});

export { getUser, getAllUser };
