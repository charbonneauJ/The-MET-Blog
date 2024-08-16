const express = require('express');  // Express is used here to create a router, it defines a set of routes(endpoints) for handling HTTP requests related to authentication.
const bcrypt = require('bcrypt');  // bcrypt hashes User passwords and compares user passwords to make sure they are authentic.
const { User } = require('../models/user');  // This is a Sequelize model representing the User table in your PostgreSQL database. It’s imported from the models directory.
const router = express.Router();  //  used to create a new instance of the Express router. This router instance allows you to define routes (HTTP endpoints) separately from the main application.


router.post('/signup', async (req, res) => {  //  This route is for the POST method on the /signup path
    try {
        const { email , password } = req.body;  // Shows that the applications expects to recieve the "password" and "email" from new user.
        const user = await User.create({ email, password});  // Creates the new user account using provided "password" and "email".(should be hashed before being stored in the database)
        req.session.userId = user.id;  // stores new user data in the session. (they are considered logged in)
        req.statusCode(201).send({ message: "User account created succefully!"});  // Following code sends a response depending on whether or not the user is succesfully logged in.
    } catch(error) {
        res.status(400).send({ error: 'User account creation failed.'});
    }
});

router.post('/login', async (req, res) => {  // Route for POST method on the '/Login' path.
    try{
        const { email, password } = req.body;  // Code expects "email" and "password"
        const user = await User.findOne({ where: { email } });  // Searches data base for provided email during login.

        if(user && await bcrypt.compare(password, user.password)) {  // If a user is found, bcrypt.compare is used to compare the provided password with the hashed password stored in the database.
            req.session.userId = user.id;  // If the compared passwords match the users ID is stored in the session. (they are logged in)
            res.send({ message: 'Login was succesful!' });  // sends mesage stating user has been logged in.
        } else {
            res.status(401).send({ error: 'Invalid email or password.'});  // If the user provides wrong email or password the codes sends an error message.
        }
    }catch (error) {
        res.status(500).send({ erorr: 'Login attempt failed.'}); // If something else goes wrong the codes sends 500 error code.
    }
});

router.post('/logout', (req, res) => {  // route for POST method on the '/logout' path.
    req.session.destroy((err) => { // This codes destroys/ends the session logging out the user.
        if (err) {
            return res.status(500).send({ error: 'Logout failed.'});  // if something goes wrong and error message is sent.
        }
        res.send({ message: 'Logged out succesfully.'});  // Message sent stating user is logged out.
    });
});

module.exports = router;  // Allows proceeding code to used throughout the application.