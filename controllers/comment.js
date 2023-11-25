const { processImage } = require("../middlewares/index");

const { ctrlWrapper } = require("../helpers");

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
  const comment = await Comment.findById(id).populate("replies");

  res.status(200).json(comment);
};

const addComment = async (req, res) => {
  let imageBuffer;
  let textFileBuffer;

  if (req.files) {
    if (req.files.image) {
      imageBuffer = await processImage(req.files.image[0].buffer);
    }

    if (req.files.textFile) {
      textFileBuffer = req.files.textFile[0].buffer;
    }
  }

  const newCommentData = {
    userName: req.body.userName,
    email: req.body.email,
    text: req.body.text,
    homepage: req.body.homepage,
    replies: [],
  };

  if (imageBuffer) {
    newCommentData.image = {
      originalname: req.files.image[0].originalname,
      mimetype: req.files.image[0].mimetype,
      size: req.files.image[0].size,
      buffer: imageBuffer,
    };
  }

  if (textFileBuffer) {
    newCommentData.textFile = {
      originalname: req.files.textFile[0].originalname,
      mimetype: req.files.textFile[0].mimetype,
      size: req.files.textFile[0].size,
      buffer: textFileBuffer,
    };
  }
  const comment = await Comment.create(newCommentData);

  res.status(201).json(comment);
};

const addReply = async (req, res) => {
  const { id: mainCommentId } = req.params;
  const { replyToId } = req.query;

  const comment = await Comment.findById(replyToId);

  let reply = {};
  let imageBuffer;
  let textFileBuffer;

  if (req.files) {
    if (req.files.image) {
      imageBuffer = await processImage(req.files.image[0].buffer);
    }

    if (req.files.textFile) {
      textFileBuffer = req.files.textFile[0].buffer;
    }
  }

  if (comment) {
    reply = await Reply.create({
      ...req.body,
      mainCommentId,
      replyTo: { replyToId, text: comment.text },
      image: imageBuffer
        ? {
            originalname: req.files.image[0].originalname,
            mimetype: req.files.image[0].mimetype,
            size: req.files.image[0].size,
            buffer: imageBuffer,
          }
        : undefined,
      textFile: textFileBuffer
        ? {
            originalname: req.files.textFile[0].originalname,
            mimetype: req.files.textFile[0].mimetype,
            size: req.files.textFile[0].size,
            buffer: textFileBuffer,
          }
        : undefined,
    });
  } else {
    const replyComment = await Reply.findById(replyToId);

    reply = await Reply.create({
      ...req.body,
      mainCommentId,
      replyTo: { replyToId, text: replyComment.reply },
      image: imageBuffer
        ? {
            originalname: req.files.image[0].originalname,
            mimetype: req.files.image[0].mimetype,
            size: req.files.image[0].size,
            buffer: imageBuffer,
          }
        : undefined,
      textFile: textFileBuffer
        ? {
            originalname: req.files.textFile[0].originalname,
            mimetype: req.files.textFile[0].mimetype,
            size: req.files.textFile[0].size,
            buffer: textFileBuffer,
          }
        : undefined,
    });
  }

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
