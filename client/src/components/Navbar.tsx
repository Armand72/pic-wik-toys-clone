import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Menu from "../assets/img/menu";
import Basket from "../assets/img/basket";
import User from "../assets/img/user";
import Search from "../assets/img/search";
import Gift from "../assets/img/gift";
import { setModal } from "../store/actions/modal";

const Navbar: FunctionComponent = () => {
  const account = () => {
    setModal();
  };
  return (
    <>
      <header className="navbar">
        <div className="navbar__top">
          <div>
            <Menu />
          </div>
          <Link to={`/`}>
            <div className="navbar__top__title">
              <img src="/images/logo.svg" alt="logo"></img>
            </div>
          </Link>
          <div className="navbar__top__user-logo">
            <div onClick={account}>
              <User />
            </div>
            <div>
              <Basket />
            </div>
          </div>
        </div>
        <div className="navbar__bottom">
          <div className="navbar__bottom__search">
            <form className="search">
              <label className="search__icon">
                <Search />
              </label>
              <input className="search__input"></input>
            </form>
          </div>
          <div className="navbar__bottom__gift">
            <Gift />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
