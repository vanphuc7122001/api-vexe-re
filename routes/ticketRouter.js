const express = require("express");
const ticketRouter = express.Router();
const ticketController = require("../controllers/ticketController");
const { checkExist } = require("../middlewares/validations/checkExist");
const { Ticket } = require("../models");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

ticketRouter.put(
  "/:id",
  authenticate,
  checkExist(Ticket),
  ticketController.updateTicket
);
ticketRouter.get(
  "/:id",
  authenticate,
  checkExist(Ticket),
  ticketController.getDetailTicket
);
ticketRouter.post("/", authenticate, ticketController.createTicket);
ticketRouter.get("/", authenticate, ticketController.getAllTicket);

module.exports = ticketRouter;
