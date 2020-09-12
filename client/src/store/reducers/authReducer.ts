import { SET_AUTH, auth } from "../actions/types";

export interface Auth {
  user: {
    name: string;
    _id: string;
    authorized: boolean;
  };
}

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
