const express = require("express");
const stationController = require("../controllers/stationController");
const stationRouter = express.Router();
const { Station } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

stationRouter.get(
  "/:id",
  checkExist(Station),
  stationController.getDetailStation
);
stationRouter.put(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPER_ADMIN"]),
  checkExist(Station),
  stationController.updateStation
);
stationRouter.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "SUPER_ADMIN"]),
  checkExist(Station),
  stationController.deleteStation
);
stationRouter.post(
  "/",
  authenticate,
  authorize(["ADMIN", "SUPER_ADMIN"]),
  stationController.createStation
);
stationRouter.get("/", stationController.getAllStation);

module.exports = stationRouter;
