import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
    index: true,
  },
});

const Likes = mongoose.model("Likes", likeSchema);

export default Likes;
