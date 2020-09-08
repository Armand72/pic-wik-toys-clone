import { SET_AUTH, auth } from "../actions/types";

const initialState = {
  user: {
    authorized: false,
    name: "",
    _id: "",
  },
};

export default function (state = initialState, action: auth) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH:
      const user: any = payload;

      return {
        ...state,
        user: { ...state.user, ...user },
      };
    default:
      return state;
  }
}
