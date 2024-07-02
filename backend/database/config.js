const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const dbName = 'dijital_dönüşüm_db';
const dbUser = 'root';
const dbPassword = '';
const dbHost = 'localhost';

(async () => {
  try {
    const connection = mysql.createConnection({ host: dbHost, user: dbUser, password: dbPassword });
    await connection.promise().query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    connection.end();

    console.log('Database created successfully.');

  } catch (error) {
    console.error('Error during database creation:', error);
  }
})();

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

module.exports = sequelize;