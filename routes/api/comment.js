const express = require("express");

const ctrl = require("../../controllers/comment");

const { validateBody, isValidId } = require("../../middlewares");

const { commentSchema, replySchema } = require("../../schemas/comment");

const router = express.Router();

router.post("/", validateBody(commentSchema), ctrl.addComment);

router.post("/reply/:id", isValidId, validateBody(replySchema), ctrl.addReply);

router.get("/all", ctrl.getAllComments);

router.get("/:id", isValidId, ctrl.getCommentById);

module.exports = router;
