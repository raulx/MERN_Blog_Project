import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.token = decoded;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Token Expired !");
  }
});

export default protect;
