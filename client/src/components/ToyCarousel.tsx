import React, { FunctionComponent, useEffect } from "react";

import { getProducts } from "../store/actions/products";
import { useSelector } from "react-redux";

import ProductsList from "./ProductsList";

const ToyCarousel: FunctionComponent = () => {
  const productList = (state) => state.products.productList;
  const product = useSelector(productList);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {product && (
        <div className="slider-product">
          {product.map((props: any, id: number) => (
            <ProductsList key={id} {...props} />
          ))}
        </div>
      )}
    </>
  );
};

export default ToyCarousel;
