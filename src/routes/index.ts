const express = require("express");
const router = express.Router();

const product = require("./product");
const user = require("./users");

router.use("/products", product);
router.use("/users", user);

module.exports = router;
