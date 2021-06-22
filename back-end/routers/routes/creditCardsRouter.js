const express = require("express");

const creditCardsRouter = express.Router();

const {
  AddCreditCard,
  getCreditCardByUser,
} = require("../controllers/creditCards");

const { authentication } = require("../middlewares/authentication");

creditCardsRouter.post("/", authentication, AddCreditCard);
creditCardsRouter.get("/", authentication, getCreditCardByUser);

module.exports = creditCardsRouter;
