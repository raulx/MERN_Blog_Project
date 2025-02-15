import { ApiResponse } from "../utils/ApiResponse.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.status === 200 ? 500 : res.statusCode;
  let message = err.message;
  // if mongoose not found error, set 404 and change error message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }

  res.status(statusCode).json(new ApiResponse(statusCode, {}, message));
};

export { notFound, errorHandler };
