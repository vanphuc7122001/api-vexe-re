const express = require("express");
const vehicleRouter = express.Router();
const { Vehicle } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const vehicleController = require("../controllers/vehicleController");

vehicleRouter.get(
  "/:id",
  authenticate,
  checkExist(Vehicle),
  vehicleController.getDetail
);
vehicleRouter.put(
  "/:id",
  authenticate,
  checkExist(Vehicle),
  vehicleController.update
);
vehicleRouter.delete(
  "/:id",
  authenticate,
  checkExist(Vehicle),
  vehicleController.delete
);
vehicleRouter.post("/", authenticate, vehicleController.create);
vehicleRouter.get("/", vehicleController.getAll);

module.exports = vehicleRouter;
