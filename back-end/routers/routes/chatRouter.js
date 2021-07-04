const express = require("express");

const { addChat, getAllChat } = require("./../controllers/chat");
const { authentication } = require("../middlewares/authentication");

const chatRouter = express.Router();

chatRouter.post("/:business_id", authentication, addChat);
chatRouter.get("/:business_id", getAllChat);

module.exports = chatRouter;
