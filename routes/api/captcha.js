const express = require("express");

const ctrl = require("../../controllers/captcha");

const router = express.Router();

router.get("/", ctrl.getCaptcha);

router.post("/validate", ctrl.postCaptchaError);

module.exports = router;
