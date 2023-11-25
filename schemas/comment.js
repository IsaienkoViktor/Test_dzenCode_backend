const Joi = require("joi");
const { namePattern, emailPattern } = require("../utils/regexp");

const commentSchema = Joi.object({
  userName: Joi.string().required().pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  homepage: Joi.string().uri(),
  text: Joi.string().required(),
  image: Joi.binary(),
  textFile: Joi.binary().max(102400),
});

const replySchema = Joi.object({
  userName: Joi.string().required().pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  homepage: Joi.string().uri(),
  reply: Joi.string().required(),
  image: Joi.binary(),
  textFile: Joi.binary().max(102400),
});

module.exports = { commentSchema, replySchema };
