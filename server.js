require("dotenv").config();
const express = require("express");
const router = require("./Routes/router");
const { errorHandler } = require("./Middleware/middleware");
const app = express();
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use(errorHandler);
app.listen(5000, () => {
  console.log("server is listening...");
});
