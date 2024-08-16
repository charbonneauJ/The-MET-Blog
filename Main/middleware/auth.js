function ensureAuthenticated(req, res, next) {  // defines 'ensureAuthenticated' as a function. 
    if (req.session.userId) {  // "if": checks if the "userId" property exists in the session.  "req": request abject representing the HTTP request.  "res": response object representing the HTTP response.  "next": Callback function that moves the request to the next middleware or route handler.  (stores the ID of the authenticated user)
        return next();  // If the user is authenticated the "next()" function is called. It tells Express to continue with the middleware or route handler.(allows request to continue)
    } else {  // this only runs of the user is not authenticated.(This code runs if "req.session.userId" does not exist)
        res.status(401).send({ error: 'You must be looged in to b-view this page.'});  // If not authorized the code will send error code 401 which means unauthorized.
    }
}

module.exports = ensureAuthenticated;  // exports code to be used througout application.