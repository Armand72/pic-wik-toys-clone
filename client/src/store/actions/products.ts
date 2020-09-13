import API from "../../api/axios";
import { GET_PRODUCTS, GET_PRODUCT, Product } from "./types";
import store from "../store";

export const getProducts = async () => {
  try {
    const products: Product = await API.get("products");

    store.dispatch({
      type: GET_PRODUCTS,
      payload: products.data,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const getProduct = async (id: string) => {
  try {
    const products: Product = await API.get(`products/${id}`);

    store.dispatch({
      type: GET_PRODUCT,
      payload: products.data,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};
