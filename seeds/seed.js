const sequelize = require("../config/connection");
const { Project, Place, User } = require("../models");

const placeData = require("./placeData.json");
console.log(placeData);

const projectData = require("./projectData.json");

const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const places = await Place.bulkCreate(placeData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      place_id: places[Math.floor(Math.random() * places.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();