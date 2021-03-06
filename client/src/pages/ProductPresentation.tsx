import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct } from "../store/actions/products";
import { setLoader, closeLoader } from "../store/actions/loader";
import { modifyCart, addCart, addCartVisitor } from "../store/actions/cart";
import { useSelector } from "react-redux";
import AddBasket from "../assets/img/addBasket";
import Check from "../assets/img/check";
import Confirmation from "../assets/img/confirmation";
import ScrollTop from "../utils/ScrollTop";

export interface Basket {
  user: string;
  productList: [];
  totalPrice: number;
  totalQuantity: number;
  fee: string;
  totalAmount: number;
}

const ProductPresentation: FunctionComponent = (props: any) => {
  ScrollTop();
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [[priceAdded, totalPrice, fee, totalAmount], setOrder] = useState([
    0,
    0,
    "OFFERT",
    0,
  ]);

  const productList = (state) => state.products.product;
  let product = useSelector(productList);
  product = product[0];
  const fetchAuth = (state) => state.auth.user;
  let auth = useSelector(fetchAuth);

  const fetchCart = (state) => state.cart;
  let cart = useSelector(fetchCart);

  const editQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name } = e.target as HTMLButtonElement;

    if (name === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const AddCart = () => {
    setLoader();
    let currentPrice = 0;
    let productList: any = [];
    let totalPrice = 0;
    let totalQuantity = 0;

    let currentBasket = JSON.parse(localStorage.getItem("cart") || "{}");

    if (Object.keys(currentBasket).length) {
      currentPrice = currentBasket.totalPrice;
      productList = [...currentBasket.productList];

      let length = productList.length;
      let index = -1;

      for (let i = 0; i < length; i++) {
        if (productList[i]._id === product._id) {
          index = i;
        }
      }

      if (index >= 0) {
        let oldQuantity = productList[index].quantity;
        let newQuantity = oldQuantity + quantity;
        totalQuantity = currentBasket.totalQuantity + quantity;

        productList[index].quantity = newQuantity;
        totalPrice = quantity * product.price + currentBasket.totalPrice;
        totalPrice = Math.round(totalPrice * 100) / 100;
      } else {
        productList.push(product);
        const lastIndex = Object.keys(productList).length - 1;
        totalQuantity = currentBasket.totalQuantity + quantity;

        productList[lastIndex].quantity = quantity;
        totalPrice = quantity * product.price + currentBasket.totalPrice;

        totalPrice = Math.round(totalPrice * 100) / 100;
      }
    } else {
      totalPrice = quantity * product.price + currentPrice;
      totalPrice = Math.round(totalPrice * 100) / 100;
      product.quantity = quantity;
      productList.push(product);
      totalQuantity = quantity;
    }

    let priceAdded = quantity * product.price;
    priceAdded = Math.round(priceAdded * 100) / 100;

    let fee = "";
    let totalAmount = 0;
    if (totalPrice > 60) {
      fee = "OFFERT";
      totalAmount = totalPrice;
    } else {
      fee = "60€";
      totalAmount = totalPrice + 60;
      parseInt(totalAmount.toFixed(2));
    }

    totalAmount = Math.round(totalAmount * 100) / 100;
    totalPrice = Math.round(totalPrice * 100) / 100;
    setOrder([priceAdded, totalPrice, fee, totalAmount]);

    const basket: Basket = {
      user: auth._id,
      productList,
      totalPrice,
      totalQuantity,
      totalAmount,
      fee,
    };

    // user and already have a cart

    if (auth.authorized && cart.totalQuantity > 0) {
      modifyCart(basket);
    } else if (auth.authorized && cart.totalQuantity === 0) {
      addCart(basket);
    } else {
      addCartVisitor(basket);
    }

    localStorage.setItem("cart", JSON.stringify(basket));

    closeLoader();
    setVisible(true);
    setQuantity(1);
  };

  const closeModal = () => {
    setVisible(false);
  };
  let id = props.match.params.id;
  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <>
      {product && (
        <div className="presentation presentation--desktop">
          <div className="presentation__image">
            <img src={product.src} alt={product.alt}></img>
          </div>

          <div className="presentation__desktop">
            <div className="presentation__info">
              <p className="presentation__brand">{product.brand}</p>
              <h1 className="presentation__name">{product.name}</h1>
              <p className="presentation__min">{product.ageMin}</p>
              <p className="presentation__description">{product.description}</p>
            </div>

            <div className="presentation__info">
              <div>
                <Check />
                <p>
                  +15
                  <span className="presentation__highlight">
                    points de fidélité
                  </span>
                </p>
              </div>
              <div>
                <Check />
                <p>
                  <span className="presentation__highlight">
                    Retour gratuit en magasin
                  </span>
                  en magasin
                </p>
              </div>
              <div>
                <Check />
                <p>
                  Paiement
                  <span className="presentation__highlight">100% sécurise</span>
                </p>
              </div>

              <div>
                <Check />
                <p>
                  <span className="presentation__highlight">
                    Livraison offerte
                  </span>
                  à partir de 60.00€
                </p>
              </div>
            </div>
            <div>
              <div className="presentation__price-info">
                <div className="presentation__quantity">
                  <p>Quantité :</p>
                  <div className="presentation__button-quantity">
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
                </div>
                <div className="presentation__price">
                  <p className="presentation__price__number">
                    {product.price}€
                  </p>
                  <p className="presentation__price__eco">
                    Dont 0.07 pour l'éco-participation
                  </p>
                </div>
              </div>
              <button
                className="button button__main presentation__button"
                onClick={AddCart}
              >
                Ajout au panier
                <div className="pl">
                  <AddBasket />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {visible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal__overlay"></div>
          <div className="modal__container">
            <div className="confirmationBasket">
              <div className="confirmationBasket__header">
                <div className="confirmationBasket__added">
                  <Confirmation />
                  <p className="text--small-blue">
                    Votre produit a bien été ajouté !
                  </p>
                </div>
                <div className="confirmationBasket__product">
                  <div className="confirmationBasket__product__container">
                    <div className="confirmationBasket__product___image">
                      <img src={product.src} alt="product" />
                    </div>
                    <div className="confirmationBasket__product__info">
                      <p>{product.name}</p>
                      <p>X{quantity}</p>
                    </div>
                  </div>
                  <div className="confirmationBasket__product__price">
                    {priceAdded}€
                  </div>
                </div>

                <div className="confirmationBasket__price">
                  <div className="confirmationBasket__price__item border">
                    <p className="text--small">Valeur du panier</p>
                    <p className="text--small">{totalPrice}€</p>
                  </div>
                  <div className="confirmationBasket__price__item border">
                    <p className="text--small">Frais de livraison</p>
                    <p className="text--blue">{fee}</p>
                  </div>
                  <div className="confirmationBasket__price__item ">
                    <p className="text--weight">Total TTC</p>
                    <p className="text--weight">{totalAmount}€</p>
                  </div>
                </div>
                <Link to={`/panier`}>
                  <button className="button button__main button--medium">
                    Voir mon panier
                    <div></div>
                  </button>
                </Link>
                <Link to={`//5f47cb6a97e330924c19230d`}>
                  <button className="button button__secondary button__secondary--formPayment button--medium  mt">
                    Continuer mes achats
                    <div></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPresentation;
