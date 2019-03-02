const express = require('express');
const router = express.Router();
const {User} = require('../../Models');
const sequelize = require('../../sequelize');
const {inputValidation,
       isUserRegistered,
       hashPassword} = require('../../middleware/user_middleware');
sequelize.sync();

router.get('/', (req,res) => {
   User.findAll()
       .then( allUsers => {
         if(allUsers) {
            res.status(200).json(allUsers)
         } else {
            res.status(404).json({msg:`We cannot get you all the users`})
         }
    })
    .catch(err => {
           res.status(500).json({msg:`Something went wrong`})
    })
});

router.get('/:id', (req,res) => {
     const {id} = req.body;
     Users.findByAll(id)
          .then( user => {
             if(user) {
                res.status(200).json(user)
             } else {
                res.status(404).json({msg:`Unable to get the user with id ${id}`});
             }
          })
          .catch(err => {
               res.status(500).json({msg:`Something went wrong`});
          })
});

router.post('/register', 
    inputValidation,
    isUserRegistered,
    hashPassword,
    (req,res) => {
    const {firstName,lastName,email,password} = req.body;
    const newUser = {firstName,lastName,email,password};
    console.log(newUser);
    User.create(newUser)
        .then( user => {
           user.password = undefined;
           res.status(201).json(user);
        })
        .catch( err => {
           res.status(500).json({msg:`Something went wrong`});
        })

});

router.post('/login', (req,res) => {

});

module.exports = router;