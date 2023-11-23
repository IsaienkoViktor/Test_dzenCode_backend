const Joi = require("joi");
const { namePattern, emailPattern } = require("../utils/regexp");

const commentSchema = Joi.object({
  userName: Joi.string().required().pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  homepage: Joi.string().uri(),
  text: Joi.string().required(),
});

const replySchema = Joi.object({
  userName: Joi.string().required().pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  homepage: Joi.string().uri(),
  reply: Joi.string().required(),
});

module.exports = { commentSchema, replySchema };
