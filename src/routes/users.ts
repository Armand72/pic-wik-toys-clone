import Users, { IUser } from "../models/Users";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my secret", {
    expiresIn: maxAge,
  });
};

//  register a user

router.post("/", async (req: any, res: any) => {
  try {
    const email: string = req.body.email;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = re.test(email);
    if (check === false) {
      const errors = "email non valide";
      throw new Error(errors);
    }
    const newUser: IUser = new Users(req.body);
    const token = createToken(newUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });

    const user = await newUser.save();

    const { name, _id } = user;
    res.status(200).json({ user: { name, _id } });
  } catch (err) {
    let errors = "";
    if (err.code === 11000) {
      errors = "Cet email a déjà été enregistré";
    } else if (err.message) {
      errors = err.message;
    } else {
      errors = "L'inscription a échoué";
    }

    res.status(400).send(errors);
  }
});

//  login a user

router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const userLogin: IUser = await Users.findOne({ email })!;

    if (userLogin) {
      try {
        const auth = await bcrypt.compare(password, userLogin.password);

        if (auth) {
          const token = createToken(userLogin._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          const { name, _id } = userLogin;
          res.status(200).json({ user: { name, _id } });
        } else {
          throw Error("mot de passe incorrect");
        }
      } catch (err) {
        const errors = err.message;
        res.status(400).json({ errors });
      }
    } else {
      throw Error("Email incorrect");
    }
  } catch (err) {
    const errors = err.message;

    res.status(400).json({ errors });
  }
});

module.exports = router;

// check current user
router.post("/check", async (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "my secret", async (err, decodedToken) => {
      if (err) {
        console.log("wrong token");
      } else {
        let user = await Users.findById(decodedToken.id);

        const data = {
          name: user.name,
          _id: user._id,
        };

        res.status(200).send({ data });
      }
    });
  } else {
    console.log("not registered");
  }
});

module.exports = router;

// disconnect current user
router.post("/disconnect", async (req: any, res: any, next: any) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send({ message: "utilisateur déconnecté" });
});

module.exports = router;
