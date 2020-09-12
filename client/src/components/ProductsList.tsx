import React, { FunctionComponent } from "react";
import AddBasket from "../assets/img/addBasket";
import { Link } from "react-router-dom";

export interface ProductsList {
  _id: string;
  brand: string;
  name: string;
  ageMin: string;
  price: number;
  src: string;
  alt: string;
}

const ProductsList: FunctionComponent<ProductsList> = (props) => {
  const { _id, src, brand, name, ageMin, price, alt } = props;
  return (
    <>
      <Link to={`/${_id}`}>
        <div className="card">
          <div className="card__image">
            <img src={src} alt={alt}></img>
          </div>
          <p className="card__brand">{brand}</p>
          <h3 className="card__name">{name}</h3>

          <div className="card__bottom">
            <div className="card__container">
              <p className="card__age">{ageMin}</p>
              <p className="card__price">{price}€</p>
            </div>
            <div>
              <AddBasket />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductsList;
