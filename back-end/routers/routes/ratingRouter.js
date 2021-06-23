const express = require("express");

const ratingRouter = express.Router();

const { addRating } = require('./../controllers/rating');
const { authentication } = require("../middlewares/authentication");


ratingRouter.post('/:business_id',authentication,addRating)

module.exports = ratingRouter;
