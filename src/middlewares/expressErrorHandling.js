/*
 * Sending Error response in development
 * When in development mode, we want to get as much error we can,
 * so as to be able to debug
 */
const sendErrorInDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

/**
 * Sending Error response in production
 * When in production, we don't want to leak the error message to the users,
 * so as to not to get compromised.
 */
const sendErrorInProd = (err, res) => {
  // Known error send by the application
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unhandled error
  console.log('💥', err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: 'Oops!!!, something went wrong, try again later',
  });
};

/**
 * Exporting the express global error handling middleware, to customised our error response.
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorInDev(err, res);
  }
  if (process.env.NODE_ENV === 'production') {
    sendErrorInProd(error, res);
  }
};
