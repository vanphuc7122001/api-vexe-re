const express = require("express");
const seatRouter = express.Router();

const { Seat } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const seatController = require("../controllers/seatController");

seatRouter.get(
  "/:id",
  authenticate,
  checkExist(Seat),
  seatController.getDetail
);
seatRouter.put("/:id", authenticate, checkExist(Seat), seatController.update);
seatRouter.delete(
  "/:id",
  authenticate,
  checkExist(Seat),
  seatController.delete
);
seatRouter.post("/", authenticate, seatController.create);
seatRouter.get("/", authenticate, seatController.getAll);

module.exports = seatRouter;
