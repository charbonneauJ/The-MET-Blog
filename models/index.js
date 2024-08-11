const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const Project = require('./Project');

const sequelize = require('../config/connection'); // Adjust the path as needed

class user extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // other fields...
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;