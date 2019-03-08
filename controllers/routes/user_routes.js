const express = require("express");
const router = express.Router();
const { User, School } = require("../../Models");
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
    include: [School],
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
      console.log(err);
      next({ ...err, code: 500 });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.body;
  Users.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({
          status: true,
          data: {
            user
          }
        });
      } else {
        next({ code: 404 });
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
