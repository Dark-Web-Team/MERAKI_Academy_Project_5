const express = require("express");

const usersRouter = express.Router();

const {createUser} = require("../controllers/users")




usersRouter.post("/",createUser)


module.exports = usersRouter;
