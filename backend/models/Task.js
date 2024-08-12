// models/Task.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Task;

