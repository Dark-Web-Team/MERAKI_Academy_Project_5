const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness,getBusinessByType} = require('./../../businessController')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id', updateBusiness);
businessRouter.delete('/:business_id',deleteBusiness);
businessRouter.get('/type/:type', getBusinessByType)

module.exports = businessRouter;
