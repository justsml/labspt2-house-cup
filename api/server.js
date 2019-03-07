const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const { User } = require('../Models');
const sequelize = require('../sequelize');

const userRouter = require('../controllers/routes/user_routes');
// const {User} = require('../Models');
// const sequelize = require('../sequelize');

// sequelize.sync();

// async function createDummyUser() {
//   await User.create({ firstName: 'Ashwin' , lastName: 'Sundaran', email: 'ashwin@yahoo.com', password: 'abcde'})
// }
// createDummyUser();
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(helmet());
server.use(logger('tiny'));
server.use(cors());


server.use('/users', userRouter);

server.get('/', (req, res) => {
  res.send(`Server is up and running now.`);
});

module.exports = {
  server,
}