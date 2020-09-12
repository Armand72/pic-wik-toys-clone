const express = require("express");
const router = express.Router();
const { Auth } = require("../auth/Auth");
import Basket, { IBasket } from "../models/Baskets";

router.get("/:id", Auth, async (req: any, res: any) => {
  try {
    const user: string = req.params.id;

    const basket: IBasket[] = await Basket.find({ user });
    res.json(basket);
  } catch (err) {
    const errors = "basket doesn't exist";
    res.status(404).json(errors);
  }
});

router.post("/", Auth, async (req: any, res: any) => {
  try {
    const initializeBasket: IBasket = new Basket(req.body);
    const basket = await initializeBasket.save();
    res.json(basket);
  } catch (err) {
    res.status(400).send("impossible to create the basket");
  }
});

router.put("/:id", Auth, async (req: any, res: any) => {
  try {
    const basket: IBasket = req.body;
    const user: string = req.params.id;
    const updatedProduct: IBasket = await Basket.findOneAndUpdate(
      { user },
      basket
    );

    await updatedProduct.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(404).send("basket does not exist");
  }
});

router.delete("/:id", Auth, async (req: any, res: any) => {
  try {
    const user: string = req.params.id;
    const product: IBasket = await Basket.findOneAndDelete({ user });
    await product.remove();
    res.json(product);
  } catch (err) {
    const errors = "basket doesn't exist";
    res.status(404).json(errors);
  }
});

module.exports = router;
