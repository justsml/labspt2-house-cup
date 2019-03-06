const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('users', {
  name: Sequelize.STRING,
});
