const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('user', {
    name: Sequelize.STRING
});