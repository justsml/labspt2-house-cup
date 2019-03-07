const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
     const {email} = user;
     const payload = {email:email}
     const options = 
}