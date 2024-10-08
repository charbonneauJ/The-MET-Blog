const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");

// const blogRoutes = require("./routes/blog");

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
// app.use("/blog", blogRoutes);

//handlebars code that will look for handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//routing that connects to the handlebars

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
    //this is to start login potentially remember to change accordingly
    name: "email",
    password: "password",
    isDisplaynamed: false,
    isPasswordEnabled: true,
  });
});

app.get("/map", (req, res) => {
  Place.findAll({ raw: true }).then((places) => {
    res.render("map", {
      title: "Map",
      places: places,
    });
  });
});

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
