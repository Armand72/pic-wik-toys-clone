const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const Auth = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SECRETJWT, (err, decodedToken) => {
      if (err) {
        const errors = "Veuillez vous reconnectez";
        res.status(401).send({ errors });
      } else {
        next();
      }
    });
  } else {
    const errors = "Unauthorised";
    res.status(401).send({ errors });
  }
};

module.exports = { Auth };
