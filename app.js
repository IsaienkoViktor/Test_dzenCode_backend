const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");
const WebSocket = require("ws");
const http = require("http");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const bodyParser = require("body-parser");

const commentRouter = require("./routes/api/comment");

const captchaRouter = require("./routes/api/captcha");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const corsOptions = {
  origin: true,
  methods: ["POST", "GET"],
  credentials: true,
  maxAge: 3600,
};

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
app.use("/api/captcha", bodyParser.json(), captchaRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

wss.on("connection", (ws) => {
  console.log("WebSocket client is connected");

  ws.on("message", (message) => {
    console.log(`Received msg: ${message}`);
  });

  ws.on("close", () => {
    console.log("WebSocket client was disconnected");
  });
});

module.exports = app;
