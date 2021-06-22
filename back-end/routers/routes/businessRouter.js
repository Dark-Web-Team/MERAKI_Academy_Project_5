const express = require("express");

const businessRouter = express.Router();

const {addBusiness} = require('./../../businessController')

businessRouter.post('/',addBusiness)

module.exports = businessRouter;
