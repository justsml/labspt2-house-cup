const express = require('express');
const { School, User, House } = require('../../Models');
const router = express.Router({
  mergeParams: true,
});
const { protectEndPoint } = require('../../auth/jwt');
const _ = require('lodash');

router.get('/', protectEndPoint, async function(req, res, next) {
  try {
    const school = await School.findByPk(req.params.id);
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (Number(school.userId) !== Number(user.id)) {
      return res.status(403).json({
        message: 'You are not authorized to make changes to this school. ',
      });
    }
    const houses = await school.getHouses();
    res.json(houses);
  } catch (err) {
    next(err);
  }
});

router.get('/:houseId', protectEndPoint, async function(req, res) {
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

router.post('/', protectEndPoint, async function(req, res) {
  try {
    const school = await School.findByPk(req.params.id);
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    if (Number(school.userId) !== Number(user.id)) {
      return res.status(403).json({
        message: 'You are not authorized to make changes to this school. ',
      });
    }
    const newHouse = await school.createHouse(req.body);
    res.json(newHouse);
  } catch (err) {
    next(err);
  }
});

router.put('/:houseId', protectEndPoint, async function(req, res, next) {
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

router.delete('/:houseId', protectEndPoint, async function(req, res, next) {
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
