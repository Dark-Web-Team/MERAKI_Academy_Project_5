const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness,getBusinessByType,getBusinessById,getBusinessByTypeByPrice} = require('./../../businessController')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id', updateBusiness);
businessRouter.delete('/:business_id',deleteBusiness);
businessRouter.get('/type/:type', getBusinessByType);
businessRouter.get('/id/:id',getBusinessById);
businessRouter.get('/filter/:type/:lowPrice/:highPrice', getBusinessByTypeByPrice);

module.exports = businessRouter;
