const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require("dotenv").config();

const { SECRET_KEY, DB_HOST } = process.env;

const bodyParser = require("body-parser");

const commentRouter = require("./routes/api/comment");

const captchaRouter = require("./routes/api/captcha");

const app = express();

const corsOptions = {
  origin: "https://test-d-zen-code-frontend.vercel.app",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: DB_HOST,
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YY_hh:mm:ss");
  fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use("/api/comment", commentRouter);
app.use("/api/captcha", captchaRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
