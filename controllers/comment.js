const { HttpError, ctrlWrapper } = require("../helpers");

const Comment = require("../models/comment");
const Reply = require("../models/reply");

const getAllComments = async (req, res) => {
  const { page = 1, limit = 25, userName, email, createdAt } = req.query;
  const skip = (page - 1) * limit;

  const sortOptions = {};
  if (userName) sortOptions.userName = userName === "desc" ? -1 : 1;
  if (email) sortOptions.email = email === "desc" ? -1 : 1;
  if (createdAt) sortOptions.createdAt = createdAt === "desc" ? -1 : 1;

  const data = await Comment.find({}).sort(sortOptions).skip(skip).limit(limit);

  res.status(200).json(data);
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);

  res.status(200).json(comment);
};

const addComment = async (req, res) => {
  const comment = await Comment.create({ ...req.body });

  res.status(201).json(comment);
};

const addReply = async (req, res) => {
  const { id: mainCommentId } = req.params;
  const { replyToId } = req.query;

  const reply = await Reply.create({ ...req.body, mainCommentId, replyToId });

  await Comment.findByIdAndUpdate(
    mainCommentId,
    { $push: { replies: reply._id } },
    { new: true }
  );

  res.status(201).json(reply);
};

module.exports = {
  addComment: ctrlWrapper(addComment),
  addReply: ctrlWrapper(addReply),
  getAllComments: ctrlWrapper(getAllComments),
  getCommentById: ctrlWrapper(getCommentById),
};
