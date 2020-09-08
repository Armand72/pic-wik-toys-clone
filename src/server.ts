export = {};
const parser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const api = require("./routes");
const connectDB = require("./config/config.ts");

require("dotenv").config();

connectDB();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

app.disable("x-powered-by");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: true,
  })
);

app.use("/api", api);

const server = require("http").createServer(app);
server.listen(SERVER_ADDRESS, () => {
  console.log(`server is listening on port ${SERVER_ADDRESS}`);
});

module.exports = server;
