import Products, { IProduct } from "../models/Products";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { Auth } = require("../auth/Auth");

router.post("/", Auth, async (req: any, res: any) => {
  try {
    const { amount, source, receipt_email } = req.body;

    console.log(source);
    const charge = await stripe.charges.create({
      amount,
      currency: "eur",
      source,
      receipt_email,
    });

    if (!charge) throw new Error("charge unsuccessful");

    res.status(200).json({
      message: "charge posted successfully",
      charge,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
