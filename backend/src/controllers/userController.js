import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import View from "../models/viewModel.js";
import Likes from "../models/likesModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { faker } from "@faker-js/faker";
import { ApiError } from "../utils/ApiError.js";
import { readFile, writeFile } from "fs/promises";
import mongoose from "mongoose";

const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) throw new ApiError(400, "All fields are required !");

  const user = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "created_by",
        as: "blogsWritten",
      },
    },
    {
      $set: {
        blogsWritten: { $size: "$blogsWritten" },
      },
    },
    {
      $lookup: {
        from: "followers",
        localField: "_id",
        foreignField: "following",
        as: "totalFollowers",
      },
    },
    {
      $set: {
        totalFollowers: { $size: "$totalFollowers" },
      },
    },
    {
      $project: {
        __v: 0,
        password: 0,
      },
    },
  ]);

  if (!user[0]) throw new ApiError(404, "user not found");

  res.json(new ApiResponse(200, user[0], "user profile fetched successfully"));
});

const getUserHistory = asyncHandler(async (req, res) => {
  const userId = req.token.userId;

  const { pageNumber } = req.query;

  if (!pageNumber) throw new ApiError(400, "page number is required");

  const userHistory = await View.aggregate([
    { $match: { userId: mongoose.Types.ObjectId.createFromHexString(userId) } },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blogId",
        foreignField: "_id",
        as: "blogData",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "created_by",
              foreignField: "_id",
              as: "created_by",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    profile_pic: 1,
                    _id: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              created_by: { $first: "$created_by" },
            },
          },
        ],
      },
    },
    {
      $project: {
        userId: 1,
        createdAt: 1,
        blogData: { $first: "$blogData" },
      },
    },

    { $skip: Number(pageNumber - 1) * 5 },
    { $limit: 5 },
  ]);

  res.json(
    new ApiResponse(200, userHistory, "user history fetched successfully")
  );
});

const getUserLikes = asyncHandler(async (req, res) => {
  const userId = req.token.userId;
  const { pageNumber } = req.query;

  if (!pageNumber) throw new ApiError(400, "page number is required !");

  const userLikes = await Likes.aggregate([
    {
      $match: {
        userId: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blogId",
        foreignField: "_id",
        as: "blogData",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "created_by",
              foreignField: "_id",
              as: "created_by",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    _id: 1,
                    profile_pic: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              created_by: { $first: "$created_by" },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        blogData: { $first: "$blogData" },
      },
    },
    {
      $project: {
        _id: 1,
        blogData: 1,
      },
    },
    { $skip: Number(pageNumber - 1) * 5 },
    { $limit: 5 },
  ]);

  res.json(
    new ApiResponse(200, userLikes, "user likes fetched successfully !")
  );
});

export { getUserProfile, getUserHistory, getUserLikes };

//FOR DEV ONLY
// MUST BE COMMENTED IN PRODUCTION

export const addFakeUser = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  if (!amount) throw new ApiError(400, "amount field is required");

  const FILE_PATH = "./dev/fakerUsers.json";

  async function appendData(newEntry) {
    try {
      // reading the file
      const data = await readFile(FILE_PATH, "utf-8");
      const jsonData = JSON.parse(data);

      // add new entry
      jsonData.push(newEntry);

      // write updated json back to the file
      await writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), "utf-8");
    } catch (err) {
      console.error("Error", err);
    }
  }

  let totalCreated = 0;
  for (let i = 0; i < amount; i++) {
    const data = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      profile_pic: faker.image.avatar(),
    };
    await appendData(data);

    await User.create(data);
    totalCreated++;
  }

  res.json(new ApiResponse(200, { totalCreated }, "data added successfully"));
});
