import React, { FunctionComponent, useState, useEffect } from "react";
import Secure from "../assets/img/secure";
import Delivery from "../assets/img/delivery";
import Send from "../assets/img/send";
import Hour from "../assets/img/hour";
import windowSize from "../utils/WindowSize";

const itemList = ["secure", "send", "delivery", "hour"];

const DeliveryCarousel: FunctionComponent = () => {
  const [item, setItem] = useState<string>("secure");
  const [[count, maxcount], setCount] = useState<number[]>([
    0,
    itemList.length - 1,
  ]);

  const dimension = windowSize();

  useEffect(() => {
    let countTimer = count;
    const timer = setInterval(() => {
      countTimer = countTimer + 1;
      setItem(itemList[countTimer]);
      setCount([countTimer, maxcount]);
    }, 4000);

    if (countTimer === maxcount) {
      setCount([-1, maxcount]);
    }

    return () => clearInterval(timer);
  }, [count, maxcount]);

  const carousel = () => {
    switch (item) {
      case "secure":
        return (
          <>
            <div className="logo-carousel">
              <Secure />
            </div>
            <p>Paiement 100% sécurisé</p>
          </>
        );
      case "send":
        return (
          <>
            <div className="logo-carousel">
              <Send />
            </div>
            <p>Retour gratuit en magasin</p>
          </>
        );
      case "delivery":
        return (
          <>
            <div className="logo-carousel">
              <Delivery />
            </div>
            <p>Livraison offerte en magasin</p>
          </>
        );
      case "hour":
        return (
          <>
            <div className="logo-carousel">
              <Hour />
            </div>
            <p>Livraison offerte en magasin</p>
          </>
        );
      default:
        return (
          <>
            <div className="delivery-carousel">
              <Secure />
            </div>
            <p>Paiement 100% sécurisé</p>
          </>
        );
    }
  };

  return (
    <>
      {dimension.width > 960 ? (
        <div className="delivery-carousel--desktop">
          <div>
            <div className="logo-carousel logo-carousel--desktop">
              <Secure />
            </div>
            <p>Paiement 100% sécurisé</p>
          </div>
          <div>
            <div className="logo-carousel logo-carousel--desktop">
              <Send />
            </div>
            <p>Retour gratuit en magasin</p>
          </div>
          <div>
            <div className="logo-carousel logo-carousel--desktop">
              <Delivery />
            </div>
            <p>Livraison offerte en magasin</p>
          </div>
          <div>
            <div className="logo-carousel logo-carousel--desktop">
              <Hour />
            </div>
            <p>Livraison offerte en magasin</p>
          </div>
        </div>
      ) : (
        <div className="delivery-carousel">{carousel()}</div>
      )}
    </>
  );
};

export default DeliveryCarousel;
