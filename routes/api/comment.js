const express = require("express");

const ctrl = require("../../controllers/comment");

const { validateBody } = require("../../middlewares");

const { commentSchema, replySchema } = require("../../schemas/comment");

const router = express.Router();

router.post("/", validateBody(commentSchema), ctrl.addComment);

router.post("/reply", validateBody(replySchema), ctrl.addReply);

router.get("/all", ctrl.getAllComments);

module.exports = router;
