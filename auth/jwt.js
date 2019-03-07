require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const uuid = require('uuid/v1');


function generateToken(email) {
  const payload = {email: email};
  const options = {algorithm: 'HS256', expiresIn: '1h', jwtid: uuid()};    
  return jwt.sign(payload, SECRET_KEY, options);
}

function protectEndPoint(req,res,next) {
       const token = req.headers.authorization;

        if(token) {
              jwt.verify(token, JWTKey, (err,decodedToken) => {
              if(err) { res.status(403).json({msg:`You cannot pass!! not decoded`});}
              console.log(`jwt protected`,decodedToken);
              req.user.decodedToken = decodedToken;
              next();
              });
        } else {
              res.status(404).json({msg: `No token provided - Access denied`});
        }
}



module.exports = {generateToken, protectEndPoint};