const svgCaptcha = require("svg-captcha");
const { ctrlWrapper } = require("../helpers");

const getCaptcha = async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: "0o1il",
    noise: 3,
    color: true,
    background: "#f0f0f0",
  });

  req.session.captchaText = captcha.text;
  await req.session.save();

  console.log("Session after saving captcha:", req.session);
  console.log("Captcha text:", captcha.text);
  console.log("Session ID:", req.sessionID);

  res.type("svg");
  res.status(200).send(captcha.data);
};

const postCaptchaStatus = async (req, res) => {
  const userInput = req.body.captcha;
  console.log("Captca text user in post request:", userInput);

  const storedCaptchaText = req.session.captchaText;
  console.log("Session ID in post request:", req.sessionID);
  console.log("Captcha in post request :", storedCaptchaText);
  console.log("Session in post request:", req.session);

  console.log(userInput === storedCaptchaText);
  if (userInput === storedCaptchaText) {
    res.send("Captcha is successfully passed!");
  } else {
    res.status(400).send("Wrong captcha try again!");
  }
};

module.exports = {
  getCaptcha: ctrlWrapper(getCaptcha),
  postCaptchaStatus: ctrlWrapper(postCaptchaStatus),
};
