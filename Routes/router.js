const express = require("express");
const fs = require("fs");
const router = express.Router();
const { jsonHandler, userLogger } = require("../Middleware/middleware");

router.use(jsonHandler);
router
  .route("/user")
  .get(userLogger, async (req, res, next) => {
    try {
      res.status(200);
      res.redirect("https://shopping-cart-0bte.onrender.com/");
    } catch (error) {
      res.status(404);
      next({ status: req.statusCode, message: error.message });
    }
  })
  .post(userLogger, async (req, res, next) => {
    try {
      res.locals.data.data.push(req.body);
      const newData = JSON.stringify(res.locals.data, null, 2);
      fs.writeFileSync("./Database/data.json", newData);
      res.status(201);
      console.log(process.env.URL)
      res.send("create successfully...");
      res.redirect(`${process.env.URL}/login`);
    } catch (error) {
      res.status(400);
      next({ status: req.statusCode, message: error.message });
    }
  });

router.route("/user/delete/:email").delete(async (req, res, next) => {
  try {
    const newData = res.locals.data.data.filter((ele) => {
      return ele.email != req.params.email;
    });

    res.locals.data.data = newData;
    fs.writeFileSync(
      "./Database/data.json",
      JSON.stringify(res.locals.data, null, 2)
    );
    res.status(204);
    res.send("delete successfully....");
  } catch (error) {
    res.status(400);
    next({ status: req.statusCode, message: error.message });
  }
});

module.exports = router;
