import React, { FunctionComponent, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Menu from "../assets/img/menu";
import Basket from "../assets/img/basket";
import User from "../assets/img/user";
import Search from "../assets/img/search";
import Gift from "../assets/img/gift";
import { setModal } from "../store/actions/modal";
import Typical from "react-typical";
import ArrowRight from "../assets/img/arrowRight";
import { useHistory } from "react-router-dom";

const Navbar: FunctionComponent = () => {
  const history = useHistory();
  const inputEl: any = useRef(null);
  const account = () => {
    setModal();
  };

  const [visible, setVisible] = useState<boolean>(true);

  const switchVisible = () => {
    setVisible(false);

    if (inputEl !== null) inputEl.current.focus();
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__top">
          <div className="d-none-mins">
            <Menu />
          </div>
          <div className="d-none-maxls navbar__top__band">
            <img src="/images/band.png"></img>
          </div>
          <Link to={`/`}>
            <div className="navbar__top__title">
              <img src="/images/logo.svg" alt="logo"></img>
            </div>
          </Link>
          <div className="navbar__top__user-logo">
            <div onClick={account} className="navbar__top__items">
              <User />
              <p>Mon compte</p>
            </div>

            <div
              className="navbar__top__items"
              onClick={() => history.push("/panier")}
            >
              <Basket />
              <p>Mon panier</p>
            </div>
          </div>
        </div>
        <div className="navbar__bottom">
          <div className="navbar__bottom__search">
            <form className="search" onClick={switchVisible}>
              <label className="search__icon">
                <Search />
              </label>
              <input ref={inputEl} className="search__input"></input>
              {visible && (
                <span className="search__typing">
                  Je recherche{" "}
                  <Typical
                    steps={[
                      "une balançoire",
                      8000,
                      "un vélo",
                      8000,
                      "une peluche",
                      8000,
                      "un jouet",
                      8000,
                    ]}
                    loop={Infinity}
                    wrapper="b"
                  />
                </span>
              )}
            </form>
          </div>
          <div className="navbar__bottom__gift">
            <Gift />
            <p>Trouver un cadeau</p>
            <ArrowRight />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
