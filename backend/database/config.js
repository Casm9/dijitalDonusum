const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dijital_dönüşüm_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
