import React, { FunctionComponent, useState } from "react";
import Cross from "../assets/img/cross";

export interface Props {
  name: string;
  price: number;
  alt: string;
  src: string;
  quantity: number;
  updateCart: Function;
  index: number;
  deleteItem: Function;
}

const CartItem: FunctionComponent<Props> = (props) => {
  const {
    name,
    price,
    alt,
    src,
    quantity,
    updateCart,
    index,
    deleteItem,
  } = props;

  const multiplied = (price: number, quantity: number) => {
    return Math.round(price * quantity * 100) / 100;
  };

  const editQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name } = e.target as HTMLButtonElement;

    let newQuantity = 0;
    let newPrice = 0;

    if (name === "plus") {
      newQuantity = quantity + 1;

      newPrice = price;
    } else {
      newQuantity = quantity - 1;

      newPrice = -price;
    }

    updateCart(newPrice, newQuantity, index);
  };

  return (
    <>
      <div className="card-cart">
        <div
          className="card-cart__close"
          onClick={() => deleteItem(index, quantity, price)}
        >
          <Cross />
        </div>
        <div className="card-cart__info">
          <div className="card-cart__info__image">
            <img src={src} alt={alt}></img>
          </div>
          <div className="card-cart__info__title">{name}</div>
        </div>
        <div className="card-cart__price">
          <div className="presentation__button-quantity card-cart__price__quantity">
            <button
              className={
                quantity === 1
                  ? "presentation__button-quantity__minus presentation__button-quantity__minus--disabled"
                  : "presentation__button-quantity__minus"
              }
              name="minus"
              onClick={editQuantity}
              disabled={quantity === 1 ? true : false}
            >
              -
            </button>
            <input
              className="presentation__button-quantity__number"
              value={quantity}
              readOnly
            />
            <button
              className="presentation__button-quantity__plus"
              name="plus"
              onClick={editQuantity}
            >
              +
            </button>
          </div>
          <div className="card-cart__price__info">
            <div className="card-cart__price__unitary">
              Prix unitaire: {price}€
            </div>
            <div className="card-cart__price__totalPrice text--blue">
              {multiplied(price, quantity)}€
            </div>
          </div>
        </div>
        <div className="card-cart__send">
          <div className="card-cart__delivery">
            <span></span>
            <p>Livraison</p>
          </div>
          <div className="card-cart__store">
            <span></span>
            <div>
              <p>Livraison</p>
              <p className="text--bold">Trouver votre magasin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
