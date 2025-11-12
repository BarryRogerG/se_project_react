const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("./constants");

// Error handling middleware
const handleError = (err, req, res, next) => {
  // Default error
  let status = INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    status = BAD_REQUEST;
    message = err.message;
  } else if (err.name === "CastError") {
    status = BAD_REQUEST;
    message = "Invalid ID format";
  } else if (err.status) {
    status = err.status;
    message = err.message;
  }

  res.status(status).json({
    message,
  });

  return next();
};

// 404 handler
const handleNotFound = (req, res) =>
  res.status(NOT_FOUND).json({ message: "Route not found" });

module.exports = {
  handleError,
  handleNotFound,
};
