import { SET_AUTH, auth } from "../actions/types";

const initialState = {
  user: {
    authorized: false,
    name: "",
  },
};

export default function (state = initialState, action: auth) {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH:
      const user: any = payload;
      console.log(user, "user");
      return {
        ...state,
        user: { ...state.user, ...user },
      };
    default:
      return state;
  }
}
