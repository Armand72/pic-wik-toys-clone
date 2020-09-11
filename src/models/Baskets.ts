import * as mongoose from "mongoose";

export interface IBasket extends mongoose.Document {
  user: string;
  products: [];
  totalPrice: number;
  totalQuantity: number;
  totalAmount: number;
  fee: string;
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
  totalAmount: {
    type: Number,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IBasket>("Baskets", BasketsSchema);
