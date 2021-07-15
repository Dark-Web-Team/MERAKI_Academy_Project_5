const express = require("express");

const imageRouter = express.Router();

const { addImage ,getImageByBusinessId } = require('./../controllers/image');


imageRouter.post('/:id',addImage)
imageRouter.get('/:id',getImageByBusinessId)

module.exports = imageRouter;
