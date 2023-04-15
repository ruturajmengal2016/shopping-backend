const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const { userLogger } = require("../Middleware/middleware");
const prisma = new PrismaClient();

router
  .route("/user")
  .get(
    async (req, res, next) => {
      try {
        const exist = await prisma.users.findUnique({
          where: {
            email: req.body.email,
          },
        });
        if (!exist) {
          res.status(400);
          throw new Error("You Don't have account");
        }
        next();
      } catch (error) {
        next({ status: res.statusCode, message: error.message });
      }
    },
    async (req, res, next) => {
      try {
        res.status(200);
        // res.send("you can log in now")
        res.redirect("https://shopping-cart-0bte.onrender.com/");
      } catch (error) {
        res.status(404);
        next({ status: req.statusCode, message: error.message });
      }
    }
  )
  .post(
    async (req, res, next) => {
      try {
        const exist = await prisma.users.findUnique({
          where: {
            email: req.body.email,
          },
        });
        if (exist) {
          res.status(400);
          throw new Error("This email is already used!");
        }
        next();
      } catch (error) {
        next({ status: res.statusCode, message: error.message });
      }
    },
    async (req, res, next) => {
      try {
        await prisma.users.create({
          data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
          },
        });
        res.status(201);
        res.send("create successfully...");
        // res.redirect(`${process.env.URL}/login`);
      } catch (error) {
        res.status(400);
        next({ status: req.statusCode, message: error.message });
      }
    }
  );

module.exports = router;
