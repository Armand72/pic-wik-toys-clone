import React, { FunctionComponent, useState, useEffect } from "react";

import { getProducts } from "../store/actions/products";
import { useSelector } from "react-redux";
import { product } from "../assets/types/types";
import ProductsList from "./ProductsList";

const ToyPresentation: FunctionComponent = () => {
  const productList = (state: any) => state.products.productList;
  const product = useSelector(productList);

  const [toys, setToys] = useState<product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setToys(product);
  }, [product]);

  return (
    <>
      <div className="presentation">
        <div className="presentation__picture-girl">
          <img src="/images/victoria.png" alt="girl"></img>
        </div>
        <h2 className="presentation__title">
          <span>La sélection de</span>
          <span>Victoria</span>
        </h2>
        <p className="presentation__subtitle">
          Une petite fille d'aujourd'hui, énergique et déterminée !
        </p>
        <p className="presentation__paragraph">
          Comme il fait beau, chez moi c’est concours de sauts sur le trampo !
          Sinon, comme les grands j’ai aussi ma maison : j’y prépare des
          barbecues pour mes peluches, et parfois j'invite aussi mes frères…
          Quand ils sont sages !
        </p>
      </div>

      {toys && (
        <div className="slider-product">
          {toys.map((props: any, id: number) => (
            <ProductsList key={id} {...props} />
          ))}
        </div>
      )}
    </>
  );
};

export default ToyPresentation;
