const express = require("express");
const tripRouter = express.Router();
const { Trip } = require("../models");
const tripController = require("../controllers/tripController");
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExist } = require("../middlewares/validations/checkExist");
tripRouter.get("/:id", checkExist(Trip), tripController.getDetailTrip);
tripRouter.delete(
  "/:id",
  authenticate,
  checkExist(Trip),
  tripController.deleteTrip
);
tripRouter.put(
  "/:id",
  authenticate,
  checkExist(Trip),
  tripController.updateTrip
);
tripRouter.post("/", authenticate, tripController.createTrip);
tripRouter.get("/", tripController.getAllTrip);

module.exports = tripRouter;
