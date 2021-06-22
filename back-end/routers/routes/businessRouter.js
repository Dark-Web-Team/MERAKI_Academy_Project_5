const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness} = require('./../../businessController')

businessRouter.post('/',addBusiness)
businessRouter.put('/:business_id', updateBusiness)

module.exports = businessRouter;
