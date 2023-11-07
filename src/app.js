const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (request, response) => {
  // WRITE YOUR CODE HERE
  const restaurants = await Restaurant.findAll();
  response.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const foundRestaurant = await Restaurant.findByPk(id);
  res.json(foundRestaurant);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/restaurants", async (req, res) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.send("New Restaurant");
});

app.put("/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.send("Restaurant updated");
});

app.delete("/restaurants/:id", async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } });
  res.send("Restaurant deleted");
});
module.exports = app;
