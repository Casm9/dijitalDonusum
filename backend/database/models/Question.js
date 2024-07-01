const { DataTypes } = require('sequelize');
const sequelize = require('../config.js')
const Response = require('./Response');

const Question = sequelize.define('Question', {
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Question.hasMany(Response, { as: 'responses' });
Response.belongsTo(Question);

module.exports = Question;