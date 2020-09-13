import { SET_POPUP, CLOSE_POPUP } from "../actions/types";

const initialState = {
  data: { visible: false, class: "", message: "" },
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  let data = payload;

  switch (type) {
    case SET_POPUP:
      return {
        ...state,
        data,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        data: { ...state.data, visible: false },
      };

    default:
      return state;
  }
}
