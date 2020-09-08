const express = require("express");
const router = express.Router();
import Products, { IProduct } from "../models/Products";

router.get("/", async (req: any, res: any) => {
  try {
    const products: IProduct[] = await Products.find();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req: any, res: any) => {
  try {
    const products: IProduct[] = await Products.find({ _id: req.params.id });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req: any, res: any) => {
  try {
    const newProduct: IProduct = new Products(req.body);
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req: any, res: any) => {
  try {
    const product: IProduct = req.body;
    const _id: string = req.params.id;
    const updatedProduct: IProduct = await Products.findOneAndUpdate(
      { _id },
      product
    );

    await updatedProduct.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req: any, res: any) => {
  try {
    const _id: string = req.params.id;
    const product: IProduct = await Products.findById(_id);
    await product.remove();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
