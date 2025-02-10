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

export { getUser };

//FOR DEV ONLY
// COMMENT THESE ROUTES IN PRODUCTION
export const getAllUser = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  res.json({ status: 200, data: allUsers });
});

export const addFakerUser = asyncHandler(async (req, res) => {
  const { email, password, profile_pic, name } = req.body;
  const newUser = { email, password, profile_pic, name };

  const user = await User.create(newUser);
  res.status(200).json({ message: "data added successfully", data: user });
});
