
const Place = require("./Place");
const Testimonial = require("./Testimonial");
const User = require("./User");
const Project = require("./Project");
// Creates a relationship between User and Testimonial model, with the User having a "has many" relationship with Testimonial model.
Place.hasMany(Testimonial, {
  foreignKey: "place_id",
  onDelete: "CASCADE",
});

// Creates a relationship between User and Testimonial model, with a "belongs to" relationship of the Testimonial to the User.
Testimonial.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Place, Testimonial, Project, User };
