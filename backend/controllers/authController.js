import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({ status: res.statusCode, id: user._id });
  } else {
    throw new Error("Login Failed ! Either email or password is wrong.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists..");
  } else {
    try {
      const newUser = {
        name,
        email,
        password,
        profilePic: "https://api.dicebear.com/7.x/lorelei/svg",
      };
      const createdUser = await User.create(newUser);
      generateToken(res, createdUser._id);
      res.status(200).json({
        state: res.statusCode,
        id: createdUser._id,
      });
    } catch (err) {
      res.status(500);
      throw new Error(`Error:${err}`);
    }
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: new Date(0) });
  res
    .status(200)
    .json({ status: res.statusCode, message: "successfully logged out" });
});

export { loginUser, registerUser, logOutUser };
