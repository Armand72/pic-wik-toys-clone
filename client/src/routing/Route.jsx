import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductPresentation from "../pages/ProductPresentation";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import MyBasket from "../pages/MyBasket";
import Login from "../components/Login";
import Popup from "../components/Popup";

const Routes = () => {
  const fetch = (state) => state.loader.visible;
  let visible = useSelector(fetch);
  const fetchModal = (state) => state.modal.modal;
  let modal = useSelector(fetchModal);
  const fetchPopup = (state) => state.popup.data;
  let popup = useSelector(fetchPopup);

  return (
    <>
      <Navbar />
      {visible && <Loader />}
      {modal && <Login />}
      <div className="padding-navbar">
        <Switch>
          <Route exact path="/" component={Homepage}></Route>
          <Route exact path="/:id" component={ProductPresentation}></Route>
          <Route exact path="/panier" component={MyBasket}></Route>

          {/* <PrivateRoute
          exact
          path="/dashboard/:idUser/chat/chatRoom/:idChild"
          component={ChatRoom}
        ></PrivateRoute> */}
        </Switch>
      </div>
      <Footer />

      {popup.visible && <Popup class={popup.class} message={popup.message} />}
    </>
  );
};

export default Routes;
