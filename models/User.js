const { DataTypes } = require('sequelize');  // DataTypes: an object imported from Sequalize that provides various data types (STRING, INTEGER, BOOLEAN, etc)
const bcrypt = require('bcrypt');  // bcrypt: Library used for hashing passwords.

module.exports = (sequelize) => {  // Module.exports: Makes code available for use throughout application
    const User = sequelize.define('User', {  // Defines new model called "User"
        email: {  // Email provided by email
            type: DataTypes.STRING,  // Restricts data types to strings (Specifies that the "email" attribute is a data type of "STRING")
            allowNull: false,  // Does not allow the "email" field to be null (it is a required field)
            unique: true,   // Requires each new "User email" to be unique (It must not already be on the data base)
            validate: {
                isEmail: true,  // "Validate" ensures that the data provided in the email field is actually an email ("isEmail: true" does thist)
            },
        },
        password: {
            type: DataTypes.STRING,  // Restricts data types to strings (Specifies that the "password" attribute is a data type of "STRING")
            allowNull: false,  // Does not allow the "password" field to be null (it is a required field)
        },
    });


    User.beforeCreate(async (user) => {  // Hook used to has the user password before it is saved to the database. "async"- asynchronus function that takes "user" instance as an argument (Works like a promise. Used to keep secure information from being posted)
        user.password = await bcrypt.hash(user.password, 12);  // Hashes User password using bcrypt with salt of '12' rounds ("await" is used because "bcrypt.hash" is an asynchronous function)
    });

    return User;  // Returns "User" model to be used thoughout application
};