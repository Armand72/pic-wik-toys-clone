export = {};
const parser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
var path = require("path");

const api = require("./routes");
const connectDB = require("./config/config.ts");

require("dotenv").config();

connectDB();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

app.disable("x-powered-by");
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.URL_DOMAIN
        : process.env.URL_LOCALHOST,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(parser.json());
app.use(
  parser.urlencoded({
    extended: true,
  })
);

app.use("/api", api);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || SERVER_ADDRESS;
const server = require("http").createServer(app);
server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

module.exports = server;
