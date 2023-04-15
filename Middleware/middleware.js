const fs = require("fs");
const errorHandler = (err, req, res, next) => {
  switch (res.statusCode) {
    case 404:
      res.send(err.message);
      break;
    case 400:
      res.send(err.message);
      console.log("Bad Request");
      break;
    case 500:
      console.log("Internal server Error");
      break;
    default:
      res.send("Everything is ok");
      break;
  }
};

const jsonHandler = (req, res, next) => {
  const data = JSON.parse(fs.readFileSync("./Database/data.json", "utf-8"));
  res.locals.data = data;
  next();
};

const userLogger = (req, res, next) => {
  const exist = res.locals.data.data.some((ele) => {
    return ele.email == req.body.email;
  });
  if (exist) {
    res.status(200)
    res.redirect('https://shopping-cart-0bte.onrender.com/home')
  }else{
    // res.redirect('https://shopping-cart-0bte.onrender.com/register')
    next()
  }
};

module.exports = { errorHandler, jsonHandler, userLogger };
