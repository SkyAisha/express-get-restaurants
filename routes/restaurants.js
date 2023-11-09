const express = require("express");
const router = express.Router();
const Restaurant = require("../models/index");
const db = require("../db/connection");

const { check, validationResult } = require("express-validator");

router.get("/", async (request, response) => {
  const restaurants = await Restaurant.findAll();
  response.json(restaurants);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const foundRestaurant = await Restaurant.findByPk(id);
  res.json(foundRestaurant);
});

router.use(express.json());
//router.use(express.urlencoded({ extended: true }));

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      await Restaurant.create(req.body);
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    }
  }
);

router.put("/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.send("Restaurant updated");
});

router.delete("/:id", async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } });
  res.send("Restaurant deleted");
});
module.exports = router;
