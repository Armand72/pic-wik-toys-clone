import { SET_CART, cart } from "../actions/types";

const initialState = {
  productList: [],
  user: "",
  totalPrice: 0,
  totalQuantity: 0,
};

export default function (state = initialState, action: cart) {
  const { type, payload } = action;

  switch (type) {
    case SET_CART:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
