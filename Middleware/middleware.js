const fs = require("fs");
const errorHandler = (err, req, res, next) => {
  switch (res.statusCode) {
    case 404:
      res.send(err.message);
      break;
    case 400:
      res.send(err.message);
      break;
    case 500:
      res.send(err.message);
      break;
    default:
      res.send(err.message);
      break;
  }
};

module.exports = { errorHandler };
