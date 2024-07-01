const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');
const Question = require('./Question');

const Option = sequelize.define('Option', {
  option_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Questions',
      key: 'id'
    }
  }
});

Question.hasMany(Option, { as: 'options', foreignKey: 'question_id' });
Option.belongsTo(Question, { foreignKey: 'question_id' });

module.exports = Option;