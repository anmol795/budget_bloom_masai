const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,  // Assuming the user ID is an integer
    allowNull: false,  // Make sure every expense is tied to a user
    references: {
      model: 'Users', // Make sure this matches your users table/model name
      key: 'id',
    },
  },
});

// Optionally, you can define associations if needed:
Expense.associate = (models) => {
  Expense.belongsTo(models.User, { foreignKey: 'userId' }); // ForeignKey relationship with User
};

module.exports = Expense;
