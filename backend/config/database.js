// config/database.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // In development, you might want to use { alter: true } instead of { force: true }
    // For production, it's recommended to use migrations instead
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized. Tables altered if necessary.');
    } else {
      await sequelize.sync();
      console.log('Database synchronized.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = { sequelize, initDatabase };