const { DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const Form = sequelize.define('Form', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Form;

