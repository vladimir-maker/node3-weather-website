const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vlada",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "HELP PAGE!!!",
    title: "Vladimir",
    name: "Vlad Mata",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About us", name: "Vladimir matic" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must to provide a address!" });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forcastData) => {
        res.send({
          location,
          forecast: forcastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vladimir Matic",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vladimir Matic",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
