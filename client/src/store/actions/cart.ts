import API from "../../api/axios";
import { SET_CART } from "./types";
import store from "../store";
import { setPopup } from "./popup";

export interface Basket {
  user: string;
  productList: [];
  totalPrice: number;
  totalQuantity: number;
  fee: string;
  totalAmount: number;
}

export const checkCart = async (id: string) => {
  try {
    const response = await API.get(`baskets/${id}`);

    if (response.status === 200) {
      const {
        user,
        productList,
        totalPrice,
        totalQuantity,
        fee,
        totalAmount,
      } = response.data[0];
      const basket = {
        user,
        productList,
        totalPrice,
        totalQuantity,
        fee,
        totalAmount,
      };
      localStorage.setItem("cart", JSON.stringify(basket));

      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
    } else {
      //  S'il y a un panier dans le localstorage alors il devient celui de l'utilsateur
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

// add items for the first time for a user
export const addCart = async (basket: Basket) => {
  try {
    const response = await API.post(`baskets`, basket);

    if (response.status === 200) {
      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
      setPopup({
        message: "Panier actualisé",
        visible: true,
        class: "popup--info",
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

// add items if there are no users
export const addCartVisitor = async (basket: Basket) => {
  try {
    store.dispatch({
      type: SET_CART,
      payload: { ...basket },
    });
    setPopup({
      message: "Panier actualisé",
      visible: true,
      class: "popup--info",
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

// add items if there are no users
export const addCartVisitorApp = async (basket: Basket) => {
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

// modify cart of an existing cart for a user
export const modifyCart = async (basket: Basket) => {
  try {
    const response = await API.put(`baskets/${basket.user}`, basket);
    if (response.status === 200) {
      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });
      setPopup({
        message: "Panier actualisé",
        visible: true,
        class: "popup--info",
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const deleteCart = async (id: string) => {
  try {
    const response = await API.delete(`baskets/${id}`);

    if (response.status === 200) {
      const basket = {
        user: id,
        productList: [],
        totalPrice: 0,
        totalQuantity: 0,
        fee: "",
        totalAmount: 0,
      };

      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });

      localStorage.removeItem("cart");

      setPopup({
        message: "Merci pour votre commande",
        visible: true,
        class: "popup--info",
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const resetCart = async (id: string) => {
  try {
    const response = await API.delete(`baskets/${id}`);

    if (response.status === 200) {
      const basket = {
        user: id,
        productList: [],
        totalPrice: 0,
        totalQuantity: 0,
        fee: "",
        totalAmount: 0,
      };

      store.dispatch({
        type: SET_CART,
        payload: { ...basket },
      });

      localStorage.removeItem("cart");

      setPopup({
        message: "Panier actualisé",
        visible: true,
        class: "popup--info",
      });
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const deleteCartVisitor = async () => {
  try {
    const basket = {
      user: "",
      productList: [],
      totalPrice: 0,
      totalQuantity: 0,
      fee: "",
      totalAmount: 0,
    };

    store.dispatch({
      type: SET_CART,
      payload: { ...basket },
    });

    localStorage.removeItem("cart");
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};
