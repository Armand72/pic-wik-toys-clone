import * as mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  brand: string;
  ageMin: string;
  description: string;
  price: number;
  src: string;
  alt: string;
}

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  ageMin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IProduct>("Products", ProductsSchema);
