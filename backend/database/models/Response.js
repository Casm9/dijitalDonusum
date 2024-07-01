const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Response = sequelize.define('Response', {
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    selected: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Response;