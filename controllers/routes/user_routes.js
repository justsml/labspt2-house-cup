const express = require("express");
const { User, School, House } = require('../../Models');
const router = express.Router();
const sequelize = require("../../sequelize");
const {
  inputValidation,
  isUserRegistered,
  hashPassword,
  loginValidation,
  findUser,
  checkPassword,
  provideAccess
} = require("../../middleware/user_middleware");

router.get("/", (req, res, next) => {
  User.findAll({
    include: [{ model: School, include: [House]}],
    attributes: ["firstName", "lastName", "email"]
  })
    .then(allUsers => {
      if (allUsers) {
        res.status(200).json({
          status: true,
          data: {
            allUsers
          }
        });
      } else {
        next({ code: 404 });
      }
    })
    .catch(err => {
      console.log(err, 'error!');
      next({ ...err, code: 500 });
      // res.status(500).json({err})
    });
});

router.get("/:id", (req, res) => {
  console.log('hello!', req.params.id);
  const  id  = req.params.id;
  // Users.findById(id)
  User.findOne({where: {email: id} })
    .then(user => {
      if (user) {
        res.status(200).json({
          status: true,
          data: {
            user
          }
        });
      } else {
        // next({ code: 404 });
        console.error('get request by id failure!');
      }
    })
    .catch(err => {
      next({ ...err, code: 500 });
    });
});

router.post(
  "/register",
  inputValidation,
  isUserRegistered,
  hashPassword,
  (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const newUser = { firstName, lastName, email, password };
    console.log(newUser);
    User.create(newUser)
      .then(user => {
        user.password = undefined;
        res.status(201).json({
          status: true,
          data: {
            user
          }
        });
      })
      .catch(err => {
        console.log(err);
        next({ ...err, code: 500 });
      });
  }
);

router.post(
  "/login",
  loginValidation,
  findUser,
  checkPassword,
  provideAccess,
  (req, res) => {}
);

module.exports = router;
