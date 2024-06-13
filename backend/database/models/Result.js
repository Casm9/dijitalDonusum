const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const Result = sequelize.define('Result', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Result;
