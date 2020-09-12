import { SET_POPUP, CLOSE_POPUP } from "./types";
import store from "../store";

export const setPopup = async (data: object) => {
  try {
    store.dispatch({
      type: SET_POPUP,
      payload: data,
    });
  } catch (err) {
    const errors = err.response;
    if (errors) {
      console.log(errors);
    }
  }
  setTimeout(() => store.dispatch({ type: CLOSE_POPUP }), 4000);
};
