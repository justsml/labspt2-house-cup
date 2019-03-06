const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { User } = require('../Models');
const sequelize = require('../sequelize');

sequelize.sync();
async function createDummyUser(count) {
  if (!count) return;
  await User.create({ name: 'User' + count });
  createDummyUser(count - 1);
}

// createDummyUser(10);
async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

async function createUser(user) {
  const newUser = await User.create(user);

  return newUser;
}

// createDummyUser(10);

async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

server.get('/', (req, res) => {
  res.send(`Server is up and running now.`);
});

server.get('/api/users', async (req, res) => {
  const users = await getAllUsers();

  res.json(users);
});

server.post('/api/users', async (req, res) => {
  const newUser = await createUser(req.body);

  res.json(newUser);
});

module.exports = {
  server,
}