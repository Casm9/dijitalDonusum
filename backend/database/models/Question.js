const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  selected: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Question;