const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness,getBusinessByType,getBusinessById,getBusinessByTypeByPrice,getBusinessByTypeByPriceByCity} = require('./../controllers/businessController')

const {authentication} = require('../middlewares/authentication')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id',authentication, updateBusiness);
businessRouter.delete('/:business_id',authentication, deleteBusiness);
businessRouter.get('/type/:type', getBusinessByType);
businessRouter.get('/id/:id',getBusinessById);
businessRouter.get('/filter/:type/:lowPrice/:highPrice', getBusinessByTypeByPrice);
businessRouter.get('/filter2/:type/:lowPrice/:highPrice/:city', getBusinessByTypeByPriceByCity);


module.exports = businessRouter;
