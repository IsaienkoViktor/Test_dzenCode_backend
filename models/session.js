const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const sessionSchema = new Schema({
  captchaText: {
    type: String,
    required: true,
  },
});

sessionSchema.post("save", handleMongooseError);

const Session = model("session", sessionSchema);

module.exports = Session;
