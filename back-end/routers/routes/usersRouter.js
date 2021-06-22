const express = require("express");

const usersRouter = express.Router();
const  {createNewUser} = require("./usersControler");
// const { addToCart, getProduct, deleteProduct } = require("../controllers/cart");
// const authentication = require("../../routers/middlewares/authentication");
   usersRouter.post("/",  createNewUser);
// cartRouter.post("/", authentication, addToCart);
// cartRouter.get("/", authentication, getProduct);
// cartRouter.put("/", authentication, deleteProduct);

module.exports = usersRouter;
