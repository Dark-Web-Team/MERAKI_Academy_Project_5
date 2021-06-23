const express = require("express");

const usersRouter = express.Router();

const {createUser,getUser,updateUser} = require("../controllers/users")




usersRouter.post("/",createUser)
usersRouter.get("/",getUser)
usersRouter.put("/:user_id",updateUser)

module.exports = usersRouter;
