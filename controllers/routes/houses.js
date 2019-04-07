const express = require('express');
const { School, User, House } = require('../../Models');
const router = express.Router({
  mergeParams: true,
});
const { protectEndPoint } = require('../../auth/jwt');
const _ = require('lodash');

router.get('/', async function(req, res, next) {
  try {
    // const school = await School.findByPk(req.params.id);
    // const user = await User.findOne({
    //   where: {
    //     email: req.User.email,
    //   },
    // });

    // if (Number(school.userId) !== Number(user.id)) {
    //   return res.status(403).json({
    //     message: 'You are not authorized to make changes to this school. ',
    //   });
    // }
    // const houses = await school.getHouses();
    // res.json(houses);
    const houses = await House.findAll({
      // attributes: ["name", "points", "color"]
    });
    return res.json({
        status: true,
        data: {
          houses,
        },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:houseId', async function(req, res) {
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] },
          },
        ],
      },
    ],
  });

  res.json(house);
});

router.post('/', async function(req, res, next) {
  try {
    // const school = await School.findByPk(req.params.id);
    // const user = await User.findOne({
    //   where: {
    //     email: req.user.email,
    //   },
    // });

    // if (Number(school.userId) !== Number(user.id)) {
    //   return res.status(403).json({
    //     message: 'You are not authorized to make changes to this school. ',
    //   });
    // }
    // const newHouse = await school.createHouse(req.body);
    // res.json(newHouse);

    const newHouse = await House.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: {
        name: req.body.name,
        color: req.body.color,
        schoolId: req.body.schoolId
      }
    });
    return res.json({
      status: true,
      data: {
        newHouse,
      }
    })
  } catch (err) {
    next(err);
  }
});

router.put('/:houseId', async function(req, res, next) {
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] },
          },
        ],
      },
    ],
  });

  const loggedInUser = await User.findOne({
    where: {
      email: req.user.email,
    },
  });

  if (!loggedInUser) return next({ code: 403 });

  if (Number(loggedInUser.id) !== Number(_.get(house, 'school.user.id'))) {
    return res.status(403).json({
      message: 'You are not authorized to make changes to this school. ',
    });
  }
  const updatedHouse = await house.update(req.body);
  res.json(updatedHouse);
});

router.delete('/:houseId', async function(req, res, next) {
  const house = await House.findByPk(req.params.houseId, {
    include: [
      {
        model: School,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'isAdmin'] },
          },
        ],
      },
    ],
  });

  const loggedInUser = await User.findOne({
    where: {
      email: req.user.email,
    },
  });

  if (!loggedInUser) return next({ code: 403 });

  if (Number(loggedInUser.id) !== Number(_.get(house, 'school.user.id'))) {
    return res.status(403).json({
      message: 'You are not authorized to make changes to this school. ',
    });
  }
  await house.destroy();
  res.json(house);
});

module.exports = router;
