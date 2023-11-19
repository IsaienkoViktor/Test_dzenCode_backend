const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const { namePattern, emailPattern, allowedTags } = require("../utils/regexp");

const xss = require("xss");

const commentSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Set user name"],
      match: namePattern,
    },
    email: {
      type: String,
      required: [true, "Set email"],
      match: emailPattern,
    },
    text: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          const sanitizedText = xss(v, { whiteList: allowedTags });
          return sanitizedText === v;
        },
        message: (props) => `${props.value} contains disallowed HTML tags!`,
      },
    },
    homepage: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "reply",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

commentSchema.post("save", handleMongooseError);

const Comment = model("comment", commentSchema);

module.exports = Comment;
