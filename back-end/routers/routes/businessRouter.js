const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness,getBusinessByType,getBusinessById} = require('./../../businessController')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id', updateBusiness);
businessRouter.delete('/:business_id',deleteBusiness);
businessRouter.get('/type/:type', getBusinessByType);
businessRouter.get('/id/:id',getBusinessById);

module.exports = businessRouter;
