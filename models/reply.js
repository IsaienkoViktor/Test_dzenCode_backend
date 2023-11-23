const { Schema, model } = require("mongoose");
const xss = require("xss");

const { handleMongooseError } = require("../helpers");
const { namePattern, emailPattern, allowedTags } = require("../utils/regexp");

const replyToSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  text: {
    type: String,
  },
});

const replySchema = new Schema(
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
    reply: {
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
    mainCommentId: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
    replyTo: {
      type: replyToSchema,
    },
  },
  { versionKey: false, timestamps: true }
);

replySchema.post("save", handleMongooseError);

const Reply = model("reply", replySchema);

module.exports = Reply;
