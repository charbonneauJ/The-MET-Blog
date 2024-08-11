const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create Testimonial model and datatypes, including the user_id foreign key.
class Testimonial extends Model {}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        max: 500,
        min: 10,
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "place",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "testimonial",
  }
);

module.exports = Testimonial;
