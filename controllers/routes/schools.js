const express = require('express');
const { School, User, House } = require('../../Models');
const router = express.Router();
const { protectEndPoint } = require('../../auth/jwt');
const houses = require('./houses');


router.get('/', async function(req, res) {
  const sequelize = User.sequelize;
  try {
    const schools = await School.findAll({
      include: [{ model: User, include:[House] }],
      attributes: [
          [ sequelize.fn( 'concat',  sequelize.col('firstName'), ' ', sequelize.col('lastName') ),'name', 'email']
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

router.get('/:id', async function(req, res) {
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

router.post('/',  protectEndPoint, async function(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.user.email,
      },
    });
    console.log(`Line 52`, req.user.email);
    const newSchool = await School.create({
      ...req.body,
      userId: user.id,
    });

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

//Delete schools
router.delete('/:id', protectEndPoint,  async function(req, res, next) {
  const school = await School.findByPk(req.params.id, {
    include: [ {
      model: House
      
    },   
        ],
  });
  
  const loggedInUser = await User.findOne({
    where: {   email: req.user.email },
  });

  if (!loggedInUser) return next({ code: 403 });

  if (Number(loggedInUser.id) !== Number(_.get(school, 'school.user.id'))) {
    return res.status(403).json({
      message: 'You are not authorized to make changes to this school. ',
    });
  }
  await school.destroy();
  res.status(200).json({msg:`The school with ${req.params.id} has been deleted`});
    //  res.status(200).json(school);
  next();
});


// Add school routes above this  line
// nested route
router.use('/:id/houses', houses);

module.exports = router;
