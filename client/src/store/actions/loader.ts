import { SET_LOADER, CLOSE_LOADER } from "./types";
import store from "../store";

export const setLoader = async () => {
  try {
    store.dispatch({
      type: SET_LOADER,
      payload: true,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};

export const closeLoader = async () => {
  try {
    store.dispatch({
      type: CLOSE_LOADER,
      payload: false,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
};
