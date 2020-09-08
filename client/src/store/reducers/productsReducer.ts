import {
  GET_PRODUCTS,
  GET_PRODUCT,
  SET_TOTALQUANTITY,
  ProductTypes,
  totalItems,
} from "../actions/types";

const initialState = {
  productList: [],
  product: [],
  totalQuantity: 0,
};

export default function (
  state = initialState,
  action: ProductTypes | totalItems
) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
      };
    case SET_TOTALQUANTITY:
      return {
        ...state,
        totalQuantity: payload,
      };
    default:
      return state;
  }
}
