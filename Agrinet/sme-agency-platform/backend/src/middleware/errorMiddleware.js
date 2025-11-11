// 404 Error Handler - for routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler - catches all errors
const errorHandler = (err, req, res, next) => {
  // Determine the status code
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode);
  
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };
