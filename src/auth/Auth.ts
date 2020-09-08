const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const requireAuth = (req: any, res: any, next: any) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "my secret", (err, decodedToken) => {
      if (err) {
        const errors = "Veuillez vous reconnectez";
        res.status(401).send({ errors });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    const errors = "Veuillez vous reconnectez";
    res.status(401).send({ errors });
  }
};

module.exports = { requireAuth };
