const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Place extends Model {}

Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    database_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    travel_advisory: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },

    other_names: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },

    languages_spoken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },

    traveler_testimonial: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },

    user_testimonial: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      
    },
  },
  // password: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     len: [8],
  //   },
  // },

  // Hooks are used so that if a user is created or updated, the password is encrypted before being stored in the database.
  // hooks: {
  //   beforeCreate: async (newPlaceData) => {
  //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
  //     return newUserData;
  //   },
  //   beforeUpdate: async (updatedUserData) => {
  //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
  //     return updatedUserData;
  //   },
  // },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "place",
  }
);

module.exports = Place;
