const express = require("express");
const passengerCarCompaniesRouter = express.Router();
const passengerCarCompaniesController = require("../controllers/passengerCarCompaniesController");
const { PassengerCarCompany } = require("../models");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { uploadImages } = require("../middlewares/uploads/upload-img-new");

passengerCarCompaniesRouter.put(
  "/:id",
  authenticate,
  checkExist(PassengerCarCompany),
  passengerCarCompaniesController.update
);

// upload images
passengerCarCompaniesRouter.patch(
  "/:id",
  authenticate,
  checkExist(PassengerCarCompany),
  uploadImages("imagePCC"),
  passengerCarCompaniesController.uploadImages
);

passengerCarCompaniesRouter.delete(
  "/:id",
  authenticate,
  checkExist(PassengerCarCompany),
  passengerCarCompaniesController.delete
);

// authenticate,
//   uploadImages("avatar"),
//   userController.uploadAvatar

passengerCarCompaniesRouter.get(
  "/:id",
  authenticate,
  checkExist(PassengerCarCompany),
  passengerCarCompaniesController.showDetail
);

passengerCarCompaniesRouter.post(
  "/",
  authenticate,
  passengerCarCompaniesController.create
);

passengerCarCompaniesRouter.get(
  "/",
  authenticate,
  passengerCarCompaniesController.showAll
);

module.exports = passengerCarCompaniesRouter;
