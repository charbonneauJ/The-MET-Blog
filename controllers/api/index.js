const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const placeRoutes = require('./placeRoutes');
const projectRoutes = require('./projectRoutes');

// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/places', placeRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
