const parser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const api = require('./routes');
// const connectDB = require('./config/db');

require('dotenv').config();

// connectDB();

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

app.use(parser.json());
app.use(
    parser.urlencoded({
        extended: true,
    }),
);
app.use(cors());

app.use('/api', api);

const server = require('http').createServer(app);
server.listen(SERVER_ADDRESS, () => {
    console.log(`server is listening on port ${SERVER_ADDRESS}`);
});

module.exports = server;
