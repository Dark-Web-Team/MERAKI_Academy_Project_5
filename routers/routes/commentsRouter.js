const express = require("express");

const commentsRouter = express.Router();

const {addComment,getComments,deleteComment} = require("../controllers/comments")
const { authentication } = require("../middlewares/authentication");


commentsRouter.post("/:business_id",authentication,addComment)
commentsRouter.get("/:business_id",getComments)
commentsRouter.delete("/:comment_id",deleteComment)


module.exports = commentsRouter;
