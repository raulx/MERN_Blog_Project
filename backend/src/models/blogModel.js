import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },

    category: {
      type: String,
      required: true,
      enum: [
        "politics",
        "sports",
        "music",
        "travel",
        "finance & bussiness",
        "fashion & lifestyle",
        "food",
        "health",
        "science & technology",
      ],
    },
    image: { public_id: String, remote_url: String },

    created_by: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

// blogSchema.index({ created_by: 1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
