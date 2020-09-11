import { SET_MODAL, CLOSE_MODAL } from "./types";
import store from "../store";

export const setModal = async () => {
  try {
    store.dispatch({
      type: SET_MODAL,
      payload: true,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const closeModal = async () => {
  try {
    store.dispatch({
      type: CLOSE_MODAL,
      payload: false,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};
