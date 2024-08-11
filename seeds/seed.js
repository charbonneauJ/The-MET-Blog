const sequelize = require("../config/connection");
const { Project, Place } = require("../models");

const placeData = require("./placeData.json");

const projectData = require("./projectData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

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
