const express = require('express');
const { School, User } = require('../../Models');
const router = express.Router();
const { protectEndPoint } = require('../../auth/jwt');
const houses = require('./houses');

router.get('/', protectEndPoint, async function(req, res) {
  const sequelize = User.sequelize;
  try {
    const schools = await School.findAll({
      include: [
        {
          model: User,
          attributes: [
            [
              sequelize.fn(
                'concat',
                sequelize.col('firstName'),
                ' ',
                sequelize.col('lastName')
              ),
              'name',
            ],
            'email',
          ],
        },
      ],
    });
    return res.json({
      status: true,
      data: {
        schools,
      },
    });
  } catch (err) {
    console.log(err);
    next({ ...err, code: 500 });
  }
});

router.get('/:id', protectEndPoint, async function(req, res) {
  try {
    const school = await School.findById(req.params.id);
    res.json({
      status: true,
      data: {
        school,
      },
    });
  } catch (err) {
    console.log(err);
    next({ ...err, code: 500 });
  }
});

router.post('/', protectEndPoint, async function(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });

    const newSchool = await School.create({
      ...req.body,
      userId: user.id,
    });

    // const newSchool = await user.addSchool(req.body);
    res.status(201).json({
      status: true,
      data: {
        newSchool,
      },
    });
  } catch (err) {
    console.log(err);
    next({ ...err, code: 500 });
  }
});

// Add school routes above this  line
// nested route
router.use('/:id/houses', houses);

module.exports = router;
