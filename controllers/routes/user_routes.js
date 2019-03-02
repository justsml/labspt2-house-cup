const express = require('express');
const router = express.Router();
const {User} = require('../../Models');
const sequelize = require('../../sequelize');
const {inputValidation,
       isUserRegistered,
       hashPassword} = require('../../middleware/user_middleware');
sequelize.sync();

router.get('/', (req,res) => {
   
});

router.get('/:id', (req,res) => {
    
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