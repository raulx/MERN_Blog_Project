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
      {
        creator_id: String,
        profile_pic: String,
        comment: String,
        creator_name: String,
        replies: [],
        created_at: { type: Date, default: Date.now },
      },
    ],
    created_by: { id: String, profile_pic: String, name: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
