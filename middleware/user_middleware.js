const {User} = require('../Models')
const bcrypt = require('bcryptjs')

function inputValidation(req,res,next) {
    const {firstName,lastName,email,password} = req.body;
    const missingFields = [];

    if(!firstName) {
      missingFields.push('firstName');
    }

    if(!lastName) {
      missingFields.push('lastName');
    }

    if(!email) {
      missingFields.push('email');
    }
    if(!password) {
      missingFields.push('password');
    }

    if(missingFields.length) {
          res.status(400).send(`The following fields are missing: ${missingFields.join(', ')}`);
    } else {
      next();
    }
}

function isUserRegistered(req,res,next) {
     const {email} = req.body;
     User.findOne({ where: {email: email} })
          .then( userDocument => {
              if(userDocument) {
                 res.status(404).json({msg:`User with email ${email} already registered.`})
              } else {
                 req.userDocument = userDocument;
                 next()
              }
          })
          .catch(err => {
               res.status(500).json({msg:`Something went wrong`})
          })
}


function hashPassword(req,res,next) {
  const {password} = req.body;
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hashedPassword) {
          if(err) { res.status(500).json({msg: `Something went wrong hashing the password`})}
          else {
            req.body.password = hashedPassword;
            next()
          }
      });
  });
}



module.exports = {
  inputValidation,
  isUserRegistered,
  hashPassword,
}