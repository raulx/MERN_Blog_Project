import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import { v2 as cloudinary } from "cloudinary";

import path from "path";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes imports
import commentRouter from "./routes/commentRoutes.js";
import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoutes.js";
import authRouter from "./routes/authRoutes.js";
import likesRouter from "./routes/likesRoutes.js";

// routes declaration
app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/likes", likesRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running...");
  });
}

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});
