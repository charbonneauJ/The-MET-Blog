const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create User model and datatypes, including the user_id foreign key.
class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = User;
