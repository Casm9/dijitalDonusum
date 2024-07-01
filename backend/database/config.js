const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const dbName = 'dijital_dönüşüm_db';
const dbUser = 'root';
const dbPassword = '';
const dbHost = 'localhost';

const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({ host: dbHost, user: dbUser, password: dbPassword });
  await connection.promise().query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();
};

createDatabaseIfNotExists();

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

module.exports = sequelize;