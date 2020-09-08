import React, { FunctionComponent, useState, useEffect } from "react";
import Input from "./Input";
import { motion, AnimatePresence } from "framer-motion";
import { closeModal } from "../store/actions/modal";
import {
  registrationUser,
  loginUser,
  disconnectUser,
} from "../store/actions/auth";
import { setPopup } from "../store/actions/popup";
import { useSelector } from "react-redux";

const variants = {
  enter: {
    x: 50,
    opacity: 0,
  },
  center: () => {
    return {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    };
  },
  exit: () => {
    return {
      x: -1000,
      opacity: 0,
    };
  },
};

const Login: FunctionComponent = (props: any) => {
  const fetchAuth = (state: any) => state.auth.user;
  let auth = useSelector(fetchAuth);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [registration, setRegistration] = useState({
    email: "",
    password: "",
    checkpassword: "",
    name: "",
  });
  const [visible, setVisible] = useState(true);

  const switchForm = () => {
    setVisible(!visible);
  };
  const getData = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({ ...login, [name]: value });
  };
  const getDataRegistration = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegistration({ ...registration, [name]: value });
  };

  const sendLogin = (e: any) => {
    e.preventDefault();

    if (login.password === "" || login.email === "") {
      setPopup({
        message: "Veuillez remplir tous les champs!",
        visible: true,
        class: "popup--error",
      });
    } else {
      let data = {
        email: login.email,
        password: login.password,
      };
      loginUser(data);
    }
  };

  const sendRegistration = (e: any) => {
    e.preventDefault();
    if (
      registration.password === "" ||
      registration.checkpassword === "" ||
      registration.email === "" ||
      registration.name === ""
    ) {
      setPopup({
        message: "Veuillez remplir tous les champs!",
        visible: true,
        class: "popup--error",
      });
    } else {
      if (registration.password === registration.checkpassword) {
        let data = {
          name: registration.name,
          email: registration.email,
          password: registration.password,
        };
        registrationUser(data);
      } else {
        setPopup({
          message: "Les mots de passe de ne sont pas identiques",
          visible: true,
          class: "popup--error",
        });
      }
    }
  };

  const close = () => {
    closeModal();
  };

  const disconnect = (e: any) => {
    e.preventDefault();
    disconnectUser();
  };

  useEffect(() => {
    if (auth.authorized) {
      setVisible(false);
    }
  }, [auth]);
  return (
    <>
      <div className="modal">
        <div className="modal__overlay--blue" onClick={close}></div>
        <div className="modal__container modal__container--account">
          {visible ? (
            <AnimatePresence initial={true}>
              <motion.div
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="modal__container__close" onClick={close}>
                  x
                </div>
                <div className="modal__container__title">
                  <h2>On se connaît déjà ?</h2>
                </div>
                <form className="modal__container__form" onSubmit={sendLogin}>
                  <div>
                    <Input
                      getData={getData}
                      label="Mon adresse email"
                      name="email"
                    />
                  </div>
                  <div>
                    <Input
                      getData={getData}
                      label="Mon mot de passe"
                      name="password"
                    />
                  </div>

                  <button
                    className="button button--small button__main"
                    type="submit"
                  >
                    Se connecter
                    <div></div>
                  </button>
                </form>
                <div className="modal__container__title">
                  <h2>Nouveau chez PicWikToys? Créer votre compte</h2>
                </div>

                <button
                  className="button button--small button__main mb"
                  onClick={switchForm}
                >
                  Créer un compte
                  <div></div>
                </button>
              </motion.div>
            </AnimatePresence>
          ) : !visible && !auth.authorized ? (
            <AnimatePresence initial={true}>
              <motion.div
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="modal__container__close" onClick={close}>
                  x
                </div>
                <div className="modal__container__title">
                  <h2>Créer votre compte</h2>
                </div>
                <form
                  className="modal__container__form"
                  onSubmit={sendRegistration}
                >
                  <div>
                    <Input
                      getData={getDataRegistration}
                      label="Mon nom"
                      name="name"
                    />
                  </div>
                  <div>
                    <Input
                      getData={getDataRegistration}
                      label="Mon adresse email"
                      name="email"
                    />
                  </div>
                  <div>
                    <Input
                      getData={getDataRegistration}
                      label="Mon mot de passe"
                      name="password"
                      type="password"
                    />
                  </div>
                  <div>
                    <Input
                      getData={getDataRegistration}
                      label="Confirmez le mot de passe"
                      name="checkpassword"
                      type="password"
                    />
                  </div>
                  <button
                    className="button button--small button__main mb"
                    type="submit"
                  >
                    Créer un compte
                    <div></div>
                  </button>
                </form>
                <div className="modal__container__title">
                  <h2>On se connaît déjà?</h2>
                </div>
                <button
                  className="button button--small button__main mb"
                  onClick={switchForm}
                >
                  Se connecter
                  <div></div>
                </button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence initial={true}>
              <motion.div
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="modal__container__close" onClick={close}>
                  x
                </div>
                <div className="modal__container__title">
                  <h2>Bienvenue {auth.name}</h2>
                </div>
                <div className="modal__container__subtitle">
                  <p>Vous êtes bien authentifié!</p>
                </div>

                <button
                  className="button button--small button__main mb mt button__main--red"
                  onClick={disconnect}
                >
                  Se déconnecter
                  <div></div>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
