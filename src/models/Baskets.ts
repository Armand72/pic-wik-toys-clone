import * as mongoose from "mongoose";

export interface IBasket extends mongoose.Document {
  user: string;
  products: [];
  totalPrice: number;
}

const BasketsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  productList: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IBasket>("Baskets", BasketsSchema);
