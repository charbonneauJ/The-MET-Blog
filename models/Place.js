const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Place extends Model {}

Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    travel_advisory: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      other_names: {
        type:
        allowNull:
        unique:

      }
      languages_spoken: {
        type:
        allowNull:
        unique:
        
      }
      traveler_testimonial: {
        type:
        allowNull:
        unique:
        
      }
      user_testimonial: {
        type:
        allowNull:
        unique:
        
      }
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [8],
    //   },
    // },
  },
  {
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'place',
  }
);

module.exports = Place;
