import API from "../../api/axios";
// import { CHECK_USER } from "./types";
import store from "../store";
import { setPopup } from "./popup";
import { closeModal } from "./modal";
import { SET_AUTH, SET_CART } from "./types";

export const registrationUser = async (data) => {
  try {
    const response = await API.post("users", data);

    if (response.status === 200) {
      const name = response.data.user.name;
      const _id = response.data.user._id;

      const payload = {
        name,
        _id,
        authorized: true,
      };
      store.dispatch({
        type: SET_AUTH,
        payload,
      });
      setPopup({
        message: "Votre compte a été créé",
        visible: true,
        class: "popup--info",
      });

      // if a localstorage exists we link it to the user account

      const basket = JSON.parse(localStorage.getItem("cart") || "{}");
      basket.user = _id;

      if (basket?.productList) {
        store.dispatch({
          type: SET_CART,
          payload: { ...basket },
        });

        await API.post(`baskets`, basket);
        localStorage.setItem("cart", JSON.stringify(basket));
      }
    }
    closeModal();
  } catch (err) {
    console.log(err.response);
    setPopup({
      message: err.response.data,
      visible: true,
      class: "popup--error",
    });
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post("users/login", data);
    if (response.status === 200) {
      const name = response.data.user.name;
      const _id = response.data.user._id;

      const payload = {
        name,
        _id,
        authorized: true,
      };

      store.dispatch({
        type: SET_AUTH,
        payload,
      });
      setPopup({
        message: "Authentification réussie",
        visible: true,
        class: "popup--info",
      });

      // if a localstorage exists we link it to the user account
      const basket = JSON.parse(localStorage.getItem("cart") || "{}");
      basket.user = _id;

      if (basket?.productList) {
        store.dispatch({
          type: SET_CART,
          payload: { ...basket },
        });

        await API.post(`baskets`, basket);
        localStorage.setItem("cart", JSON.stringify(basket));
      }
      closeModal();
    }
  } catch (err) {
    console.log(err.response);
    setPopup({
      message: err.response.data.errors,
      visible: true,
      class: "popup--error",
    });
  }
};

export const checkUser = async () => {
  try {
    const response = await API.post("users/check");
    if (response.status === 200) {
      const name = response.data.data.name;
      const _id = response.data.data._id;

      const payload = {
        name,
        _id,
        authorized: true,
      };
      store.dispatch({
        type: SET_AUTH,
        payload,
      });
    }
    closeModal();
  } catch (err) {
    console.log(err.response);
    const payload = {
      name: "",
      _id: "",
      authorized: false,
    };
    store.dispatch({
      type: SET_AUTH,
      payload,
    });
  }
};

export const disconnectUser = async () => {
  try {
    await API.post("users/disconnect");

    const payload = {
      name: "",
      _id: "",
      authorized: false,
    };
    store.dispatch({
      type: SET_AUTH,
      payload,
    });

    closeModal();
  } catch (err) {
    console.log(err.response);
  }
};
