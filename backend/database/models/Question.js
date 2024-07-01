const { DataTypes } = require('sequelize');
const sequelize = require('../config.js')

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selected: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Question;