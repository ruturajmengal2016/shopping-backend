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
        const exist = await prisma.users.findMany({
          where: {
            email: req.params.email,
          },
        });
        if (!exist.length) {
          res.status(404);
          next(Error("Sorry! You haven't account"));
        }
        next();
      } catch (error) {
        next(error);
      }
    },
    async (req, res, next) => {
      try {
        res.status(200);
        res.end();
      } catch (error) {
        next(error);
      }
    }
  )
  .post(
    // async (req, res, next) => {
    //   try {
    //     const exist = await prisma.users.findMany({
    //       where: {
    //         email: req.body.email,
    //       },
    //     });
    //     if (!exist.length) {
    //       res.status(400);
    //       next(Error("This email is already used!"));
    //     }
    //     next();
    //   } catch (error) {
    //     next(error);
    //   }
    // },
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
      } catch (error) {
        res.status(400);
        next(error);
      }
    }
  );

module.exports = router;
