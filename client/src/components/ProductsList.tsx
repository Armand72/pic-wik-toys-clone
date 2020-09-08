import React, { FunctionComponent } from "react";
import AddBasket from "../assets/img/addBasket";
import { Link } from "react-router-dom";

const ProductsList: FunctionComponent = (props: any) => {
  return (
    <>
      <Link to={`/${props._id}`}>
        <div className="card">
          <div className="card__image">
            <img src={props.src} alt="products"></img>
          </div>
          <p className="card__brand">{props.brand}</p>
          <h3 className="card__name">{props.name}</h3>

          <div className="card__bottom">
            <div className="card__container">
              <p className="card__age">{props.ageMin}</p>
              <p className="card__price">{props.price}€</p>
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
