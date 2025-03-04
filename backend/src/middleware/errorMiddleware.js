import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const notFound = (req, res, next) => {
  throw new ApiError(404, `Not found ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  let statusCode1 = err.statusCode === 200 ? 500 : err.statusCode; // custom generated error.
  const statusCode2 = res.statusCode === 200 ? 500 : res.statusCode; // error generated internally in the server while running the code.
  let message = err.message;
  let statusCode = statusCode1 || statusCode2;
  // if mongoose not found error, set 404 and change error message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }
  // if validation error occurs
  if (err.name === "ValidationError") {
    statusCode = 409;
    message = "Validation failed";
  }
  // if duplicate data is send.
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // Get the duplicate field
    (statusCode = 400),
      (message = `Duplicate key error: ${field} already exists`);
  }

  res.status(statusCode).json(new ApiResponse(statusCode, {}, message));
};

export { notFound, errorHandler };
