require("dotenv").config()
const express = require("express");
const router = require("./Routes/router");
const {errorHandler} = require("./Middleware/middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", router);



app.use(errorHandler);
app.listen(5000, () => {
  console.log("server is listening...");
});
