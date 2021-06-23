const express = require("express");

const commentsRouter = express.Router();

const {addComment} = require("../controllers/comments")
const { authentication } = require("../middlewares/authentication");


commentsRouter.post("/:business_id",authentication,addComment)

module.exports = commentsRouter;
