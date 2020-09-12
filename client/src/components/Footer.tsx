import React, { FunctionComponent } from "react";
import Accordeon from "./Accordeon";
import windowSize from "../utils/WindowSize";

const accordeonList = [
  {
    links: [
      { link: "Recrutement" },
      { link: "Nos magasins" },
      { link: "Coffre à jouets" },
    ],
    title: "Qui sommes-nous?",
  },
  {
    links: [
      { link: "Accédez au formulaire" },
      { link: "Contact PicWikToys Pro" },
    ],
    title: "contactez-nous",
  },
  {
    links: [
      { link: "Carte de fidélité" },
      { link: "Carte cadeau" },
      { link: "Condition des offres promotionnelles" },
      { link: "Service après-vente" },
      { link: "Nos catalogues" },
    ],
    title: "Nos services",
  },
];

const Footer: FunctionComponent = () => {
  const dimension = windowSize();

  return (
    <>
      <div className="footer">
        {dimension.width < 960 &&
          accordeonList.map((props, index) => (
            <Accordeon key={index} {...props} />
          ))}
        {dimension.width < 960 ? (
          <>
            <header className="footer__header">
              <p>Marques</p>
            </header>
            <header className="footer__header">
              <p>Jeux concours</p>
            </header>
          </>
        ) : (
          <div className="footer__container">
            <div className="footer__container__items">
              <h2>Qui sommes-nous?</h2>
              <div className="footer__container__lists">
                <li>Recrutement</li>
                <li>Nos magasins</li>
                <li>Coffre à jouets</li>
              </div>
            </div>
            <div className="footer__container__items">
              <h2>Contacter-nous</h2>
              <div className="footer__container__lists">
                <li>Accéder au formulaire</li>
                <li>Contact PicWIkToys Pro</li>
              </div>
            </div>
            <div className="footer__container__items">
              <h2>Nos Services</h2>
              <div className="footer__container__lists">
                <li>Carte de fidélité</li>
                <li>Carte cadeau</li>
                <li>Conditions des offres promotionnelles</li>
                <li>Service après-vente</li>
                <li>Nos catalogues</li>
              </div>
            </div>
            <div className="footer__container__items">
              <h2>Marques</h2>
            </div>
            <div className="footer__container__items">
              <h2>Jeux concours</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;
