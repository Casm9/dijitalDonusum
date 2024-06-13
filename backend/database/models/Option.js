const { DataTypes } = require('sequelize');
const sequelize = require('../config.js')

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
  
module.exports = Option;