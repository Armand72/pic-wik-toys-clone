import API from "../../api/axios";
import { SET_CART, GET_PRODUCT, SET_TOTALQUANTITY, Product } from "./types";
import store from "../store";

export const checkCart = async (id: string) => {
  try {
    const response = await API.get(`baskets/${id}`);

    if (response.status === 200) {
      const { user, productList, totalPrice, totalQuantity } = response.data[0];
      const basket = { user, productList, totalPrice, totalQuantity };
      localStorage.setItem("cart", JSON.stringify(basket));

      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
    } else {
      // DAns le cas où il n'y a pas de cart attitré à l'utilisateur connecté mais qu'il existe dans le localStorage
      const basket = JSON.parse(localStorage.getItem("cart") || "{}");
      await API.get(`baskets`, basket);
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const addCart = async (basket: object) => {
  try {
    const response = await API.post(`baskets`, basket);

    if (response.status === 200) {
      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const addCartVisitor = async (basket: object) => {
  try {
    store.dispatch({
      type: SET_CART,
      payload: { ...basket },
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const modifyCart = async (basket: any) => {
  try {
    const response = await API.put(`baskets/${basket.user}`, basket);
    if (response.status === 200) {
      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

//   export const deleteCart = async (basket: object) => {
//     try {
//       const response = await API.get(`baskets`, basket);

//       if (response.status === 200) {
//       }

//     } catch (err) {
//       const errors = err.response;
//       if (errors) {
//         console.log(errors);
//       }
//     }
//   };
