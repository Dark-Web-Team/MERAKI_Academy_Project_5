const express = require('express');

const paymentRouter = express.Router()

const {makePayment} = require('../controllers/payment');

paymentRouter.post('/',makePayment);

module.exports = paymentRouter;