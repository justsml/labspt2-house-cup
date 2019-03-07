const Sequelize = require('sequelize');
const sequelize = require('../sequelize');




module.exports = sequelize.define('users', {
     firstName: Sequelize.STRING,
     lastName: Sequelize.STRING,
     email: Sequelize.STRING,
     password: Sequelize.STRING,
     isAdmin: Sequelize.BOOLEAN
})
