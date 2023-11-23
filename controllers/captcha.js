const svgCaptcha = require("svg-captcha");
const { ctrlWrapper } = require("../helpers");
const Session = require("../models/session");

const getCaptcha = async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: "0o1il",
    noise: 3,
    color: true,
    background: "#f0f0f0",
  });

  const session = await Session.create({ captchaText: captcha.text });

  res.status(200).send({ captcha: captcha.data, sessionId: session._id });
};

const postCaptchaStatus = async (req, res) => {
  const { captcha, sessionId } = req.body;

  const session = await Session.findById(sessionId);

  if (session) {
    if (captcha === session.captchaText) {
      await Session.findByIdAndDelete(sessionId);
      res.send("Captcha is successfully passed!");
    } else {
      res.status(400).send("Wrong captcha try again!");
    }
  } else {
    res.status(400).send("Session is over");
  }
};

module.exports = {
  getCaptcha: ctrlWrapper(getCaptcha),
  postCaptchaStatus: ctrlWrapper(postCaptchaStatus),
};
