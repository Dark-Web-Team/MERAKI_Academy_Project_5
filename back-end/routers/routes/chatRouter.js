const express = require("express");

const {
  addChat,
  getAllChat,
  addPrivateChat,
  getPrivateChat,
} = require("./../controllers/chat");
const { authentication } = require("../middlewares/authentication");

const chatRouter = express.Router();

chatRouter.post("/userChat", authentication, addPrivateChat);
chatRouter.get("/userChat", authentication, getPrivateChat);
chatRouter.post("/:business_id", authentication, addChat);
chatRouter.get("/:business_id", getAllChat);

module.exports = chatRouter;
