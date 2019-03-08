const errorHandler = function(err, req, res, next) {
  return res.status(err.status || 500).json({
    error: {
      message: err.message ||'Something went wrong',
      status: err.status
    }
  });
}

module.exports = errorHandler
