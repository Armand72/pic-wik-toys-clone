import React from "react";
import "./assets/styles/main.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routing/Route";
import { checkUser } from "./store/actions/auth";

checkUser();

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

export default App;
