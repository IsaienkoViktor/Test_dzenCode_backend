const { HttpError, ctrlWrapper } = require("../helpers");

const Comment = require("../models/comment");
const Reply = require("../models/reply");

const getAllComments = async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Comment.find("-createdAt -updatedAt", { skip, limit });

  res.json(data);
};

const addComment = async (req, res) => {
  const comment = await Comment.create({ ...req.body });

  res.status(201).json(comment);
};

const addReply = async (req, res) => {
  const { _id: mainComment } = req.params;

  const reply = await Reply.create({ ...req.body, mainComment });

  res.status(201).json(reply);
};

module.exports = {
  addComment: ctrlWrapper(addComment),
  addReply: ctrlWrapper(addReply),
  getAllComments: ctrlWrapper(getAllComments),
};
