const express = require('express');  // This is a web framework for Node.js that allows you to create routes, handle HTTP requests, and build web applications.
const ensureAuthenticated = require('../middleware/auth');  // process requests before they reach the route handler. "ensureAuthenticated" middleware checks whether the user is authenticated (logged in) before allowing access to certain routes. (such as to the dashboard)
const router = express.Router();  // allows you to define routes in a modular way, so you can keep your routes organized. Instead of defining all routes in a single file, you can create separate route modules.

router.get('/dashboard', ensureAuthenticated, (res, res) => {  // This line defines a route for the /dashboard endpoint. It uses the HTTP GET method.(only runs of user is authenticated)
    res.send("Welcome to your dashboard!"); // Sends logged user welcome message.
});

module.exports=router;  // exports code allowing it to be used throughout application.