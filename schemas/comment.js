const { HttpError } = require("../helpers");
const xss = require("xss");

const Joi = require("joi");
const { namePattern, emailPattern, allowedTags } = require("../utils/regexp");

const commentSchema = Joi.object({
  userName: Joi.string().required().pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  homepage: Joi.string().uri(),
  text: Joi.string().custom((value, helpers) => {
    const sanitizedText = xss(value, { whiteList: allowedTags });
    if (sanitizedText === value) {
      return value;
    } else {
      throw HttpError(400, "any.invalid");
    }
  }),
});

const replySchema = Joi.object({
  reply: Joi.string()
    .custom((value, helpers) => {
      const sanitizedText = xss(value, { whiteList: allowedTags });
      if (sanitizedText === value) {
        return value;
      } else {
        throw HttpError(400, "any.invalid");
      }
    })
    .required(),
  mainComment: Joi.string(),
});

module.exports = { commentSchema, replySchema };
