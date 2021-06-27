const express = require("express");

const businessRouter = express.Router();

const {addBusiness,updateBusiness,deleteBusiness,getBusinessByType,getBusinessById,getBusinessByTypeByPrice,getBusinessByTypeByPriceByCity,getBusinessByCity} = require('./../controllers/businessController')

const {authentication} = require('../middlewares/authentication')

businessRouter.post('/',addBusiness);
businessRouter.put('/:business_id',authentication, updateBusiness);
businessRouter.delete('/:business_id',authentication, deleteBusiness);
businessRouter.get('/type/:type/:page', getBusinessByType);
businessRouter.get('/id/:id',getBusinessById);
businessRouter.get('/filter/:type/:lowPrice/:highPrice/:page', getBusinessByTypeByPrice);
businessRouter.get('/filter1/:type/:city/:page', getBusinessByCity);
businessRouter.get('/filter2/:type/:lowPrice/:highPrice/:city/:page', getBusinessByTypeByPriceByCity);


module.exports = businessRouter;
