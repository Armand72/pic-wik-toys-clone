export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const SET_TOTALQUANTITY = "SET_TOTALQUANTITY";
export const SET_LOADER = "SET_LOADER";
export const CLOSE_LOADER = "CLOSE_LOADER";
export const SET_MODAL = "SET_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_POPUP = "SET_POPUP";
export const CLOSE_POPUP = "CLOSE_POPUP";
export const SET_AUTH = "SET_AUTH";

export interface SetPopup {
  type: any;
  payload: {
    data: {
      visible: boolean;
      message: string;
      class: string;
    };
  };
}

export interface SetAuth {
  type: any;
  payload: {
    name: string;
    authorized: boolean;
  };
}

export interface ClosePopup {
  type: any;
  payload: object;
}

export interface SetLoader {
  type: typeof SET_LOADER;
  payload: boolean;
}

export interface CloseLoader {
  type: typeof CLOSE_LOADER;
  payload: boolean;
}

export interface SetModal {
  type: typeof SET_MODAL;
  payload: boolean;
}

export interface CloseModal {
  type: typeof CLOSE_MODAL;
  payload: boolean;
}

export interface Product {
  data: {
    ageMin: string;
    alt: string;
    brand: string;
    description: string;
    name: string;
    price: number;
    src: string;
    _id: string;
  };
}

export interface TotalQuantity {
  type: typeof SET_TOTALQUANTITY;
  payload: { totalQuantity: number };
}

export interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: {
    ageMin: string;
    alt: string;
    brand: string;
    description: string;
    name: string;
    price: number;
    src: string;
    _id: string;
  };
}
export interface GetProductAction {
  type: any;
  payload: {
    ageMin: string;
    alt: string;
    brand: string;
    description: string;
    name: string;
    price: number;
    src: string;
    _id: string;
  };
}
export type popup = SetPopup | ClosePopup;

export type ProductTypes = GetProductsAction | GetProductAction | TotalQuantity;

export type totalItems = TotalQuantity;

export type loader = SetLoader | CloseLoader;

export type modal = SetModal | CloseModal;

export type auth = SetAuth | CloseModal;
