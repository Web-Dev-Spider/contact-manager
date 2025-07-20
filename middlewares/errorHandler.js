const { errCode } = require("../constants");
const { stack } = require("../routes/user.routes");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  switch (statusCode) {
    case errCode.BAD_REQUEST:
      res.status(errCode.BAD_REQUEST).json({ titile: "Validation failed", message: err.message, stack: err.stack });
      break;
    case errCode.UNAUTHORIZED:
      res.status(errCode.UNAUTHORIZED).json({ titile: "Unauthorized", message: err.message, stack: err.stack });
      break;
    case errCode.FORBIDDEN:
      res.status(errCode.FORBIDDEN).json({ titile: "Forbidden", message: err.message, stack: err.stack });
      break;
    case errCode.NOT_FOUND:
      res.status(errCode.NOT_FOUND).json({ titile: "Not Found", message: err.message, stack: err.stack });
      break;
    default:
      res.status(errCode.SERVER_ERROR).json({ titile: "Server Error", message: err.message, stack: err.stack });
      break;
  }

  next();
};

module.exports = errorHandler;
