const express = require('express');
const { School, User } = require('../../Models');
const router = express.Router();
const { protectEndPoint } = require('../../auth/jwt');

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
    return res.json(schools);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/:id', protectEndPoint, async function(req, res) {
  try {
    const school = await School.findById(req.params.id);
    res.json(school);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'School not found' });
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
    res.status(201).json(newSchool);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong. ' });
  }
});

module.exports = router;
