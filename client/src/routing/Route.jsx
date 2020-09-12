import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductPresentation from "../pages/ProductPresentation";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import MyCart from "../pages/MyCart";
import Login from "../components/Login";
import Popup from "../components/Popup";
import Newsletter from "../components/Newsletter";

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
          <Route exact path="/panier" component={MyCart}></Route>

          <Route exact path="/:id" component={ProductPresentation}></Route>
          <Route exact path="/" component={Homepage}></Route>

          {/* <PrivateRoute
          exact
          path="/dashboard/:idUser/chat/chatRoom/:idChild"
          component={ChatRoom}
        ></PrivateRoute> */}
        </Switch>
      </div>
      <Newsletter />
      <Footer />

      {popup.visible && <Popup class={popup.class} message={popup.message} />}
    </>
  );
};

export default Routes;
