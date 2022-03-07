const notFoundError = (req, res, next) => {
  const err = new Error(`Route ${req.url} not found`);
  err.status = 404;
  throw err;
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
  console.error(err);
};

module.exports = { notFoundError, errorHandler };
