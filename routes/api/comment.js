const express = require("express");

const ctrl = require("../../controllers/comment");

const { validateBody, isValidId, upload } = require("../../middlewares");

const { commentSchema, replySchema } = require("../../schemas/comment");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "textFile", maxCount: 1 },
  ]),
  validateBody(commentSchema),
  ctrl.addComment
);

router.post(
  "/reply/:id",
  isValidId,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "textFile", maxCount: 1 },
  ]),
  validateBody(replySchema),
  ctrl.addReply
);

router.get("/all", ctrl.getAllComments);

router.get("/:id", isValidId, ctrl.getCommentById);

module.exports = router;
