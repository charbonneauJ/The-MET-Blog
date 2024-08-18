const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");

const { Place } = require("./models");

const path = require("path");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//handlebars code that will look for handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//routing that connects to the handlebars

app.get("/", (req, res) => {
  res.render("index", {
    title: "Login Page",
    //this is to start login potentially remember to change accordingly
    name: "email",
    password: "password",
    isDisplaynamed: false,
    isPasswordEnabled: true,
  });
});

app.get(
  "/map",
  // (req, res, next) => {
  //   req.firstName = "John";
  //   next();
  // },

  (req, res) => {
    Place.findAll({ raw: true }).then((places) => {
      res.render("map", {
        title: "Map",
        places: places,
      });
    });
  }
);

//this is for a different conditional that may or may not be used
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    isListEnabled: false,
  });
});

app.use(express.static(path.join(__dirname, "/Public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
