import Blog from "../models/blogModel.js";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const photo = req.file?.path;
  const user = req.user;

  if (!title || !content || !category || !photo) {
    throw new ApiError(401, "All fields are required !");
  }

  const blogPhoto = await uploadOnCloudinary(photo);

  const newBlog = {
    title,
    content,
    likes: 0,
    views: 0,
    category,
    image: { public_id: blogPhoto.public_id, remote_url: blogPhoto.secure_url },
    created_by: user._id,
  };

  const newBlogCreated = await Blog.create(newBlog);

  return res.json(
    new ApiResponse(200, newBlogCreated, "Blog posted Successfully.")
  );
});

const getBlogs = asyncHandler(async (req, res) => {
  const { page, limit, category } = req.query;
  let data;

  if (category === "all" || !category) {
    data = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
          pipeline: [{ $project: { name: 1, _id: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          created_by: {
            $first: "$created_by",
          },
        },
      },

      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);
  } else {
    data = await Blog.aggregate([
      {
        $match: {
          category: category,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
          pipeline: [{ $project: { name: 1, _id: 1, profile_pic: 1 } }],
        },
      },
      {
        $addFields: {
          created_by: {
            $first: "$created_by",
          },
        },
      },

      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);
  }

  res.json(new ApiResponse(200, data, "blogs fetched successfully"));
});

const getBlogData = asyncHandler(async (req, res) => {
  const { blogId } = req.query;

  // first view incremented if blog found.
  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { $inc: { views: 1 } }, // Increment the views by 1
    { new: true, runValidators: true }
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  //  blog sent with creator and comment data.
  // const blogData = await Blog.aggregate([
  //   {
  //     $match: {
  //       _id: mongoose.Types.ObjectId.createFromHexString(blogId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "created_by",
  //       foreignField: "_id",
  //       as: "created_by",
  //       pipeline: [
  //         {
  //           $project: {
  //             name: 1,
  //             email: 1,
  //             profile_pic: 1,
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     $addFields: {
  //       created_by: {
  //         $first: "$created_by",
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "comments",
  //       localField: "_id",
  //       foreignField: "blogId",
  //       as: "comments",
  //       pipeline: [
  //         {
  //           $match: {
  //             parentId: null,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "comments",
  //             localField: "_id",
  //             foreignField: "parentId",
  //             as: "replies",
  //           },
  //         },
  //         {
  //           $project: {
  //             blogId: 1,
  //             userId: 1,
  //             commentText: 1,
  //             createdAt: 1,
  //             updatedAt: 1,
  //             parentId: 1,
  //             replies: {
  //               $sortArray: {
  //                 input: "$replies",
  //                 sortBy: { createdAt: -1 },
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     $project: {
  //       title: 1,
  //       content: 1,
  //       created_by: 1,
  //       views: 1,
  //       likes: 1,
  //       createdAt: 1,
  //       updatedAt: 1,
  //       category: 1,
  //       image: 1,
  //       comments: {
  //         $sortArray: {
  //           input: "$comments",
  //           sortBy: { createdAt: -1 },
  //         },
  //       },
  //     },
  //   },
  // ]);

  const blogData = await Blog.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.createFromHexString(blogId),
      },
    },
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
              email: 1,
              profile_pic: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        created_by: {
          $first: "$created_by",
        },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "blogId",
        as: "comments",
        pipeline: [
          {
            $match: {
              parentId: null,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "postedBy",
              pipeline: [
                {
                  $project: {
                    name: 1,
                    profile_pic: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              postedBy: { $first: "$postedBy" },
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "parentId",
              as: "replies",
              pipeline: [
                {
                  $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "replyPostedBy",
                    pipeline: [
                      {
                        $project: {
                          email: 1,
                          profile_pic: 1,
                          name: 1,
                        },
                      },
                    ],
                  },
                },
                {
                  $addFields: {
                    replyPostedBy: {
                      $first: "$replyPostedBy",
                    },
                  },
                },
                {
                  $project: {
                    userId: 0,
                    __v: 0,
                  },
                },
              ],
            },
          },
          {
            $project: {
              blogId: 1,
              postedBy: 1,
              commentText: 1,
              createdAt: 1,
              updatedAt: 1,
              parentId: 1,
              replies: {
                $sortArray: {
                  input: "$replies",
                  sortBy: { createdAt: -1 },
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        created_by: 1,
        views: 1,
        likes: 1,
        createdAt: 1,
        updatedAt: 1,
        category: 1,
        image: 1,
        comments: {
          $sortArray: {
            input: "$comments",
            sortBy: { createdAt: -1 },
          },
        },
      },
    },
  ]);

  res.json(new ApiResponse(200, blogData[0]));
});

const getUserBlogs = asyncHandler(async (req, res) => {
  const { userId } = req.token;
  const { pageNumber } = req.query;

  if (!pageNumber)
    res.json({ status: 401, message: "pagenumber is required !" });

  const userBlogs = await Blog.aggregate([
    {
      $match: {
        created_by: mongoose.Types.ObjectId.createFromHexString(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "created_by",
        foreignField: "_id",
        as: "created_by",
        pipeline: [{ $project: { name: 1, profile_pic: 1, _id: 1 } }],
      },
    },
    {
      $addFields: {
        created_by: { $first: "$created_by" },
      },
    },
    { $skip: Number(pageNumber - 1) * 10 },
    { $limit: 10 },
  ]);

  res.json(new ApiResponse(200, userBlogs, "Userblogs fetched successfully !"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const blog = await Blog.findById(blogId);
  // first delete the blog photo from cloudinary
  await cloudinary.uploader.destroy(blog.image.public_id);

  await Blog.findByIdAndDelete(blogId);

  res.json(new ApiResponse(200, {}, "Blog deleted successfully"));
});

export { addBlog, getBlogs, getBlogData, getUserBlogs, deleteBlog };

// FOR DEV ONLY
// FAKE DATA GENERATION CONTROLLERS MUST BE COMMENTED IN PRODUCTION
export const addFakeBlogs = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);

  const user = req.user;

  const categories = [
    "politics",
    "sports",
    "music",
    "travel",
    "finance & bussiness",
    "fashion & lifestyle",
    "food",
    "health",
    "science & technology",
  ];

  let totalCreated = 0;

  for (let i = 0; i < amount; i++) {
    const newBlog = {
      title: faker.lorem.sentence({ min: 5, max: 10 }),
      content: faker.lorem.paragraph({ min: 15, max: 75 }),

      category: categories[Math.floor(Math.random() * categories.length)],

      image: {
        public_id: faker.lorem.word(),
        remote_url: faker.image.urlLoremFlickr({ height: 400, width: 400 }),
      },
      created_by: user._id,
    };

    const createdBlog = await Blog.create(newBlog);
    if (createdBlog) totalCreated += 1;
  }

  res.json(
    new ApiResponse(200, totalCreated, "fake blogs created successfully")
  );
});
