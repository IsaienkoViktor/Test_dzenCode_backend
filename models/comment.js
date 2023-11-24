const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const { namePattern, emailPattern } = require("../utils/regexp");

const fileSchema = new Schema({
  originalname: String,
  mimetype: String,
  size: Number,
  buffer: Buffer,
});

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
    image: fileSchema,
    textFile: fileSchema,
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
