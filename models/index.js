const Place = require('./Place');
const Project = require('./Project');

// Creates a relationship between User and Project model, with the User having a "has many" relationship with Project model.
Place.hasMany(Project, {
  foreignKey: 'place_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Project model, with a "belongs to" relationship of the Project to the User.
Project.belongsTo(Place, {
  foreignKey: 'place_id'
});

module.exports = { Place, Project };
