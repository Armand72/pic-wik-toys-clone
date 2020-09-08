import { combineReducers } from "redux";
import products from "./productsReducer";
import loader from "./loaderReducer";
import modal from "./modalReducer";
import popup from "./popupReducer";
import auth from "./authReducer";
import cart from "./cartReducer";

export default combineReducers({
  products,
  loader,
  modal,
  popup,
  auth,
  cart,
});
