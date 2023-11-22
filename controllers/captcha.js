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
  res.type("svg");
  res.status(200).send(captcha.data);
};

const postCaptchaError = (req, res) => {
  const userInput = req.body.captcha;
  console.log(userInput);

  const storedCaptchaText = req.session.captchaText;

  if (userInput === storedCaptchaText) {
    res.send("Captcha is successfully passed!");
  } else {
    res.status(400).send("Wrong captcha try again!");
  }
};

module.exports = {
  getCaptcha: ctrlWrapper(getCaptcha),
  postCaptchaError: ctrlWrapper(postCaptchaError),
};
