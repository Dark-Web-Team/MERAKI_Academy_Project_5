const express = require("express");

const ratingRouter = express.Router();

const { addRating ,getUserRating} = require('./../controllers/rating');
const { authentication } = require("../middlewares/authentication");


ratingRouter.post('/:business_id',authentication,addRating)
ratingRouter.get('/:business_id',authentication,getUserRating)

module.exports = ratingRouter;
