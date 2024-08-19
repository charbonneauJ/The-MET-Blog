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
    name: {
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
    modelName: "user", // Name the model
    freezeTableName: true,
    underscored: true,
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = User;