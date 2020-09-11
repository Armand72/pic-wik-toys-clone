import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routing/Route";
import { useSelector } from "react-redux";
import { checkCart } from "./store/actions/cart";
import { addCartVisitorApp } from "./store/actions/cart";

function App() {
  const fetchAuth = (state: any) => state.auth.user;
  let auth = useSelector(fetchAuth);

  if (auth.authorized) {
    checkCart(auth._id);
  } else {
    const basket = JSON.parse(localStorage.getItem("cart") || "{}");
    addCartVisitorApp(basket);
  }

  return (
    <Router>
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
