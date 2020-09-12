import Products, { IProduct } from "../models/Products";
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51HPjswGZm9C9etrMsq8gj129iTSIo1EsNTBAA3JuI5s18rPGQabyd6Jmpq9WRo4ra4sOCrPEKKr10efE4Y768ULA00sHmwyZAn"
);
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
