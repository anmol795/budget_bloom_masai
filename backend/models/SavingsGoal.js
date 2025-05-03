const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path as necessary

const SavingsGoal = sequelize.define('SavingsGoal', {
  goalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currentAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID, // Use DataTypes.UUID for consistency
    allowNull: false,
  },
}, {
  tableName: 'SavingsGoals', // Ensure the table name matches your database
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
module.exports = SavingsGoal;