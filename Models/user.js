const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('users', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
});

/*
  knex('users').select('firstName')

  users = User.findAll()
*/