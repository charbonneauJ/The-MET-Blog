const router = require("express").Router();
// Import the routes. This is how we make our routes modular.
const placeRoutes = require("./placeRoutes");
const testimonialRoutes = require("./testimonialRoutes");
const authRoutes = require("./auth");

// When a request is made to the /users or /testimonials path, it will be directed to the index.js in the /users or /testimonials folder.
router.use("/places", placeRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/auth", authRoutes);

module.exports = router;
