const router = require("express").Router();
// Import the User model from the models folder
const { Place } = require("../../models");

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.get("/", getPlaces);

async function getPlaces(req, res) {
  // be sure to include its associated Category and Tag data
  const places = await Place.findAll({});
  if (!places) {
    res.status(400).send("No places found.");
    return;
  }

  res.status(200).json(places);
}

router.post("/", async (req, res) => {
  try {
    const placeData = await Place.create(req.body);

    req.session.save(() => {
      req.session.place_id = placeData.id;
      req.session.logged_in = true;

      res.status(200).json(placeData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
// TODO this either needs to be removed OR moved to the User/Authentication controller
router.post("/login", async (req, res) => {
  try {
    const placeData = await Place.findOne({ where: { email: req.body.email } });

    if (!placeData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await placeData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.place_id = placeData.id;
      req.session.logged_in = true;

      res.json({ place: placeData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
