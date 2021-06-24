const express = require("express");

const commentsRouter = express.Router();

const {addComment,getComments} = require("../controllers/comments")
const { authentication } = require("../middlewares/authentication");


commentsRouter.post("/:business_id",authentication,addComment)
commentsRouter.get("/:business_id",getComments)

module.exports = commentsRouter;
