import React, { FunctionComponent } from "react";
import Accordeon from "./Accordeon";

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
  return (
    <>
      <div className="footer">
        {accordeonList.map((props, index) => (
          <Accordeon key={index} {...props} />
        ))}
        <header className="footer__header">
          <p>Marques</p>
        </header>
        <header className="footer__header">
          <p>Jeux concours</p>
        </header>
      </div>
    </>
  );
};

export default Footer;
