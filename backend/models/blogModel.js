import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    views: Number,
    likes: Number,
    category: String,
    image: { public_id: String, remote_url: String },
    comments: [
      { creator_id: String, profilePic: String, body: String, replies: [] },
    ],
    created_by: { id: String, profile_pic: String, name: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
