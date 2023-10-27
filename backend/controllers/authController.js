import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({ message: "successfully logged in" });
  } else {
    throw new Error("password does not matched.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists..");
  } else {
    try {
      const newUser = { email, password, profilePic: "", name: "unknown" };
      const createdUser = await User.create(newUser);
      generateToken(res, createdUser._id);
      res.status(200).json({
        state: res.statusCode,
        message: "registered user successfully",
        data: createdUser,
      });
    } catch (err) {
      res.status(500);
      throw new Error(`Error:${err}`);
    }
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: new Date(0) });
  res.status(200).json({ message: "successfully logged out" });
});

export { loginUser, registerUser, logOutUser };
