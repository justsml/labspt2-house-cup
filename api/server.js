const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const { User, School } = require("../Models");
const sequelize = require("../sequelize");

School.belongsTo(User, {
  foreignKey: 'userId'
});

// school.getUser()

// OR

User.hasMany(School, {
  foreignKey: "userId"
});

// user.getSchools()
// user.createSchool()

/*
  source.methodName(target, options)

  belongsTo
    it adds a foreignKey in the source model

  hasOne
    it adds a foreignKey to the target model

  hasMany
    it adds a foreignKey to the target model

  belongsToMany
*/

sequelize.sync();
const userRouter = require("../controllers/routes/user_routes");
const schoolsRouter = require("../controllers/routes/schools");
const { errorHandler } = require("../middleware/index");
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(logger("tiny"));
server.use(cors());

server.use("/users", userRouter);
server.use("/schools", schoolsRouter);

server.get("/", (req, res) => {
  res.send(`Server is up and running now.`);
});

server.use(errorHandler);

module.exports = {
  server
};
