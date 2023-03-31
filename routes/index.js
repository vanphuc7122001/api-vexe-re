const stationRouter = require("./stationRouter");
const userRouter = require("./userRouter");
const tripRouter = require("./tripRouter");
const ticketRouter = require("./ticketRouter");
const passengerCarCompaniesRouter = require("./passengerCompaniesRouter");
const vehicleRouter = require("./vehicleRouter");
const seatRouter = require("./seatRouter");

const initRoutes = (app) => {
  app.use("/api/station", stationRouter);
  app.use("/api/user", userRouter);
  app.use("/api/trip", tripRouter);
  app.use("/api/ticket", ticketRouter);
  app.use("/api/passengerCarCompanies", passengerCarCompaniesRouter);
  app.use("/api/vehicle", vehicleRouter);
  app.use("/api/seat", seatRouter);
};

module.exports = { initRoutes };
