const express = require("express");
const router = express.Router();

const product = require("./product");
const user = require("./users");
const basket = require("./basket");

router.use("/products", product);
router.use("/users", user);
router.use("/baskets", basket);

module.exports = router;
