const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const sequelize = require('../sequelize')
const { User } = require('../Models')

sequelize.sync();

// async function createDummyUser(count) {
//   if (!count) return;
//   await User.create({ name: 'User' + count });
//   createDummyUser(count - 1);
// }

// createDummyUser(10);

async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

async function createUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.send(`Server is up and running now.`)
})

server.get('/api/users', async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
})

server.post('/api/users', async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
})

module.exports = {
  server,
}