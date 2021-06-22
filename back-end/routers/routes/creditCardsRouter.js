const express = require("express");

const creditCardsRouter = express.Router();

const {AddCreditCard} = require("../controllers/creditCards")

const {authentication} = require("../middlewares/authentication")

creditCardsRouter.post("/",authentication, AddCreditCard)


module.exports = creditCardsRouter;
