require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const uuid = require("uuid/v1");

function generateToken(email) {
  const payload = { email: email };
  const options = { algorithm: "HS256", expiresIn: "1h", jwtid: uuid() };
  return jwt.sign(payload, SECRET_KEY, options);
}

function protectEndPoint(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        next({ ...err, code: 403 });
      }
      console.log(`jwt protected`, decodedToken);
      req.user = decodedToken;
      console.log(decodedToken);
      next();
    });
  } else {
    next({ code: 403 });
  }
}

module.exports = { generateToken, protectEndPoint };
