const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create User model
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "User", // Name the model
    tableName: "users", // Explicitly name the table (optional)
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = User;