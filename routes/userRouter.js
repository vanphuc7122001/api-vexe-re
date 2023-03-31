const express = require("express");
const { checkEmail } = require("../middlewares/validations/checkEmailExist");
// const { uploadImages } = require("../middlewares/uploads/upload-img");
const { authenticate } = require("../middlewares/auth/authenticate");

const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/register", checkEmail, userController.register);
userRouter.post("/login", userController.login);

// lấy tất cả chuyến đi mà các người dùng đả đặt
userRouter.get(
  "/get-all-trip-of-users",
  authenticate,
  userController.getAllTripOfUsers
);

userRouter.get(
  "/get-all-ticket-that-users-orders/:id",
  authenticate,
  userController.getAllTicketThatUserOrder
);

userRouter.get("/get-info-trip", authenticate, userController.getInfoTrips);

const { uploadImages } = require("../middlewares/uploads/upload-img-new");

userRouter.post(
  "/upload-avatar",
  authenticate,
  uploadImages("avatar"),
  userController.uploadAvatar
);
module.exports = userRouter;
