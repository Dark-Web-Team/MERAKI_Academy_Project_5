const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness} = require('./../../businessController')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id', updateBusiness);
businessRouter.delete('/:business_id',deleteBusiness);

module.exports = businessRouter;
