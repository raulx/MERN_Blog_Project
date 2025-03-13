import mongoose, { Schema } from "mongoose";

const followerSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

followerSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follower = mongoose.model("Followers", followerSchema);

export default Follower;
