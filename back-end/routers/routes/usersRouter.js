const express = require("express");

const usersRouter = express.Router();

const {createUser,getUser,updateUser} = require("../controllers/users")
const { authentication } = require("../middlewares/authentication");



usersRouter.post("/",createUser)
usersRouter.get("/",authentication,getUser)
usersRouter.put("/",authentication,updateUser)

module.exports = usersRouter;
