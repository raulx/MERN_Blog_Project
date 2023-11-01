import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    likes: Number,
    category: String,
    image: { public_id: String, remote_url: String },
    comments: [
      { creator_id: String, profilePic: String, body: String, replies: [] },
    ],
    creator_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
