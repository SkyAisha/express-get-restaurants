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
app.use(express.urlencoded());

app.post("/restaurants", async (req, res) => {
  const newRestaurant = await req.body;
});

app.put("/restaurants/:id", async (req, res) => {
  const id = res.params.id;
  const updatedRestaurant = await req.body;
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
});
module.exports = app;
