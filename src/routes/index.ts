const express = require("express");
const router = express.Router();

const product = require("./product");
const user = require("./users");
const basket = require("./basket");
const payments = require("./payments");

router.use("/products", product);
router.use("/users", user);
router.use("/baskets", basket);
router.use("/payments", payments);

module.exports = router;
