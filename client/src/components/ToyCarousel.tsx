import React, { FunctionComponent, useState, useEffect } from "react";

import { getProducts } from "../store/actions/products";
import { useSelector } from "react-redux";
import { product } from "../assets/types/types";
import ProductsList from "./ProductsList";

const ToyCarousel: FunctionComponent = () => {
  const productList = (state) => state.products.productList;
  const product = useSelector(productList);

  const [toys, setToys] = useState<product[]>([]);

  useEffect(() => {
    getProducts();
    setToys(product);
  }, [product]);

  return (
    <>
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

export default ToyCarousel;
