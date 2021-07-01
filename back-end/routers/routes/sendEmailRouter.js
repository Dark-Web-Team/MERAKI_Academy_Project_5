const express = require("express");

const { Transporter } = require('./../controllers/sendEmail');

const sendEmailRouter = express.Router();

sendEmailRouter.post('/',Transporter)

module.exports = sendEmailRouter;