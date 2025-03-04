import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    commentText: { type: String, required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

// commentSchema.index({ blogId: 1, parentId: 1, createdAt: -1 });
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
