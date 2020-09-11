/* tslint:disable */
import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  modifyCart,
  addCartVisitor,
  deleteCart,
  deleteCartVisitor,
  resetCart,
} from "../store/actions/cart";
import { setModal } from "../store/actions/modal";
import { setPopup } from "../store/actions/popup";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Axios from "../api/axios";
import ScrollTop from "../utils/ScrollTop";

import ToysCarousel from "../components/ToyCarousel";

const MyCart: FunctionComponent = (props: any) => {
  ScrollTop();
  const fetchCart = (state: any) => state.cart;
  let cart = useSelector(fetchCart);
  const {
    productList,
    fee,
    totalPrice,
    totalAmount,
    user,
    totalQuantity,
  } = cart;
  const fetchAuth = (state: any) => state.auth.user;
  let auth = useSelector(fetchAuth);

  const [visible, setVisible] = useState(false);
  const [receipt, setReceipt] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const account = () => {
    setModal();
  };
  const modal = () => {
    setVisible(!visible);
  };

  //  DELETE ITEM - remove item from basket
  const deleteItem = (index: number, quantity: number, price: number) => {
    const newProductList = productList;
    const newTotalQuantity = totalQuantity - quantity;

    newProductList.splice(index, 1);

    let newTotalPrice = totalPrice - price * quantity;
    let newFee = fee;
    let newTotalAmount = totalAmount;

    console.log(newProductList, newTotalQuantity, index, newTotalPrice);

    if (newTotalQuantity === 0 && auth.authorized) {
      console.log("cart reset user");
      resetCart(cart.user);
    } else if (newTotalQuantity === 0 && !auth.authorized) {
      console.log("cart reset visitor");
      deleteCartVisitor();
    } else {
      console.log("cart update");
      if (newTotalPrice > 60) {
        newFee = "OFFERT";
        newTotalAmount = newTotalPrice;
      } else {
        newFee = "60€";
        newTotalAmount = newTotalPrice + 60;
      }

      newTotalPrice = Math.round(newTotalPrice * 100) / 100;
      newTotalAmount = Math.round(newTotalAmount * 100) / 100;

      const basket = {
        user,
        productList: newProductList,
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity,
        fee: newFee,
        totalAmount: newTotalAmount,
      };

      if (auth.authorized) {
        modifyCart(basket);
      } else {
        addCartVisitor(basket);
      }
      localStorage.setItem("cart", JSON.stringify(basket));
    }
  };

  //  UPDATE ITEM - update basket

  const updateCart = (
    addedAmount: number,
    newQuantity: number,
    index: number,
    price: number
  ) => {
    let newTotalPrice = totalPrice + addedAmount;

    let newTotalQuantity = totalQuantity;

    if (productList[index].quantity > newQuantity) {
      newTotalQuantity = newTotalQuantity - 1;
    } else {
      newTotalQuantity = newTotalQuantity + 1;
    }

    let newProductList = productList;
    newProductList[index].quantity = newQuantity;

    let newFee = fee;
    let newTotalAmount = totalAmount;
    if (newTotalPrice > 60) {
      newFee = "OFFERT";
      newTotalAmount = newTotalPrice;
    } else {
      newFee = "60€";
      newTotalAmount = newTotalPrice + 60;
    }

    newTotalPrice = Math.round(newTotalPrice * 100) / 100;
    newTotalAmount = Math.round(newTotalAmount * 100) / 100;

    const basket = {
      user,
      productList: newProductList,
      totalPrice: newTotalPrice,
      totalQuantity: newTotalQuantity,
      fee: newFee,
      totalAmount: newTotalAmount,
    };

    if (auth.authorized) {
      modifyCart(basket);
    } else {
      addCartVisitor(basket);
    }
    localStorage.setItem("cart", JSON.stringify(basket));
  };

  // payment stripe

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements === null || stripe === null) return;
    const card = elements.getElement(CardNumberElement);

    if (card === null) return;

    const token: any = await stripe.createToken(card);

    try {
      const order = await Axios.post("/payments", {
        amount: totalAmount.toString().replace(".", ""),
        source: token.token.id,
        receipt_email: "armandmeunier@hotmail.fr",
      });

      deleteCart(cart.user);

      setReceipt(order.data.charge.receipt_url);
    } catch (err) {
      console.log(err.message);
      setPopup({
        message: "Numéro de carte invalide. Tapez : 4242 4242 4242 4242",
        visible: true,
        class: "popup--error",
      });
    }
  };

  return (
    <>
      <div className="cart">
        <div className="cart__container">
          <h1>Mon panier</h1>
          {productList.length === 0 && <h1>Votre panier est vide!</h1>}
          <div className="cart__list">
            {productList &&
              productList.map((props: any, index: number) => (
                <CartItem
                  key={index}
                  {...props}
                  updateCart={updateCart}
                  index={index}
                  deleteItem={deleteItem}
                />
              ))}
          </div>
        </div>
        <div className="cart__recap">
          <h1>Récapitulatif</h1>

          <div className="confirmationBasket__price">
            <div className="confirmationBasket__price__item border">
              <p className="text--small">Valeur du panier</p>
              <p className="text--small">{totalPrice}€</p>
            </div>
            <div className="confirmationBasket__price__item border">
              <p className="text--small">Frais de livraison</p>
              <p className="text--blue">{totalPrice === 0 ? "" : fee}</p>
            </div>
            <div className="confirmationBasket__price__item ">
              <p className="text--weight">Total TTC</p>
              <p className="text--weight">
                {totalPrice === 0 ? "0" : totalAmount}€
              </p>
            </div>
          </div>

          <button
            className={
              totalPrice === 0
                ? "button button__main index button--small button__main--disabled "
                : "button button__main index button--small"
            }
            disabled={totalPrice === 0 ? true : false}
            onClick={auth.authorized ? () => setVisible(true) : account}
          >
            Commander
            <div></div>
          </button>
        </div>
      </div>

      <ToysCarousel />

      {visible && (
        <div className="modal">
          <div className="modal__overlay--blue" onClick={modal}></div>
          <div className="modal__container modal__container--account">
            <div className="modal__container__close" onClick={modal}>
              x
            </div>
            <div className="modal__container__title">
              <h2>Veuillez remplir les champs.</h2>
            </div>
            <div className="text--small mb">
              <p>(Numéro carte test : 4242 4242 4242 4242)</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="modal__container__formPayment"
            >
              <label>
                Numéro de carte
                <CardNumberElement />
              </label>
              <label>
                date d'expiration <CardExpiryElement />
              </label>
              <label>
                CVC
                <CardCvcElement />
              </label>
              {receipt ? (
                <p className="mt">
                  Voici votre reçu :
                  <a
                    className="modal__container__link"
                    target="_blank"
                    href={receipt}
                  >
                    LIEN
                  </a>
                </p>
              ) : (
                <button
                  className={
                    !stripe
                      ? "button button__main index button--small button__main--disabled "
                      : "button button__main index button--small"
                  }
                  disabled={!stripe ? true : false}
                  type="submit"
                >
                  Payer
                  <div></div>
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCart;
