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
  products: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IBasket>("Baskets", BasketsSchema);
