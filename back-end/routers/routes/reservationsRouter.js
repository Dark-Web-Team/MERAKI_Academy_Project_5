const express = require("express");

const reservationsRouter = express.Router();

const { addReservations } = require("../controllers/reservations")
const { authentication } = require("../middlewares/authentication");


reservationsRouter.post("/:business_id",authentication,addReservations)


module.exports = reservationsRouter;