import API from "../../api/axios";
// import { CHECK_USER } from "./types";
import store from "../store";
import { setPopup } from "./popup";
import { closeModal } from "./modal";
import { SET_AUTH } from "./types";

export const registrationUser = async (data: any) => {
  try {
    const response = await API.post("users", data);

    if (response.status === 200) {
      const name = response.data.user;

      const payload = {
        name,
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

export const loginUser = async (data: any) => {
  try {
    const response = await API.post("users/login", data);
    console.log(response.data.user);
    if (response.status === 200) {
      const name = response.data.user;

      const payload = {
        name,
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
      const name = response.data.user;

      const payload = {
        name,
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
      authorized: false,
    };
    store.dispatch({
      type: SET_AUTH,
      payload,
    });
  }
};

export const disconnectUser = async () => {
  console.log("here");
  try {
    await API.post("users/disconnect");

    const payload = {
      name: "",
      authorized: false,
    };
    store.dispatch({
      type: SET_AUTH,
      payload,
    });

    closeModal();
  } catch (err) {
    console.log(err.response);
    console.log("errreeeeeeeeeeur");
  }
};