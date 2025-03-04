import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database.");
    })
    .catch((err) => {
      console.log(`Error connecting to db with Error:${err}`);
    });
};

export default connectDB;
