import { SET_LOADER, CLOSE_LOADER, loader } from "../actions/types";

const initialState = {
  visible: false,
};

export default function (state = initialState, action: loader) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return {
        ...state,
        visible: payload,
      };
    case CLOSE_LOADER:
      return {
        ...state,
        visible: payload,
      };
    default:
      return state;
  }
}
