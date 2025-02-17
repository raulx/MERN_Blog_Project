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
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Schema Validation failed";
  }

  res.status(statusCode).json(new ApiResponse(statusCode, {}, message));
};

export { notFound, errorHandler };
