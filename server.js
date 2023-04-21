require("dotenv").config();
const express = require("express");
const router = require("./Routes/router");
const { errorHandler } = require("./Middleware/middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });
app.use("/api", router);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("server is listening...");
});
