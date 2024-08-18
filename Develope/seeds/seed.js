const sequelize = require("../config/connection");
const { Place, User } = require("../models");

const placeData = require("./placeData.json");
console.log(placeData);

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

  process.exit(0);
};

seedDatabase();
