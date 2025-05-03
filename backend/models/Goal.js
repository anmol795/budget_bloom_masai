const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Goal = sequelize.define('Goal', {
  month: DataTypes.INTEGER,
  year: DataTypes.INTEGER,
  targetAmount: DataTypes.FLOAT,
});

User.hasMany(Goal);
Goal.belongsTo(User);

module.exports = Goal;
