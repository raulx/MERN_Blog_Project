import mongoose, { Schema } from "mongoose";

const viewSchema = Schema(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      index: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

viewSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const View = mongoose.model("View", viewSchema);

export default View;
