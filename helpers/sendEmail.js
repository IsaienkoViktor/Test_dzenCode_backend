const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

require("dotenv").config();

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "isaenkov1986@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
