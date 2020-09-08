import { SET_MODAL, CLOSE_MODAL, modal } from "../actions/types";

const initialState = {
  modal: false,
};

export default function (state = initialState, action: modal) {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL:
      return {
        ...state,
        modal: payload,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: payload,
      };
    default:
      return state;
  }
}
