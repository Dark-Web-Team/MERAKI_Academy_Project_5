const express = require("express");

const { Transporter } = require('./../controllers/sendEmail');
const {authentication} = require('./../middlewares/authentication');
const sendEmailRouter = express.Router();

sendEmailRouter.post('/',authentication, Transporter)


module.exports = sendEmailRouter;