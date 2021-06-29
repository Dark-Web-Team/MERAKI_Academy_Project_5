const express = require("express");

const reservationsRouter = express.Router();

const {
  addReservations,
  getReservationsByDate,
  getUserReservation,
} = require("../controllers/reservations");
const { authentication } = require("../middlewares/authentication");

reservationsRouter.get("/", authentication, getUserReservation);
reservationsRouter.post("/:business_id", authentication, addReservations);
reservationsRouter.get(
  "/:business_id/:reservation_date",
  getReservationsByDate
);

module.exports = reservationsRouter;
