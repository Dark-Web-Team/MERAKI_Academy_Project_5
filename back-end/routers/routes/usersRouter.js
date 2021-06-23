const express = require("express");

const usersRouter = express.Router();

const {createUser,getUser} = require("../controllers/users")




usersRouter.post("/",createUser)
usersRouter.get("/",getUser)


module.exports = usersRouter;
