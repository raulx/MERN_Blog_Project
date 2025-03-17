import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { faker } from "@faker-js/faker";
import { ApiError } from "../utils/ApiError.js";
import { readFile, writeFile } from "fs/promises";
import mongoose from "mongoose";

const getUser = asyncHandler(async (req, res) => {
  const userId = req.token.userId;

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

export { getUser };

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
