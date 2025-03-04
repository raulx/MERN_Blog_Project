import express from "express";
import cookieParser from "cookie-parser";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

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

app.use(notFound);

app.use(errorHandler);

export { app };
