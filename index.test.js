const request = require("supertest");
const db = require("./db/connection");
const Restaurant = require("./models/Restaurant");
const seedRestaurant = require("./seedData");
const app = require("./src/app");

describe("./restaurant endpoint", () => {
  // Write your tests here
  it("Testing restaurant endPoint", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
  });

  it("testing GET/restaurants/:id returns restaurant by id", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });

  it("POST should create new restaurant", async () => {
    const newRestaurant = {
      name: "Noodle Haven",
      location: "New York",
      cuisine: "Korean",
    };
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurant);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });

  it("PUT should update restaurant", async () => {
    const updatedRestaurant = {
      name: "LittleLamb",
      location: "Dallas",
      cuisine: "Hotpot",
    };
    const response = await request(app)
      .put("/restaurants/2")
      .send(updatedRestaurant);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });

  it("DELETE should delete existing restaurant", async () => {
    const response = await request(app).delete("/restaurants/1");
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toEqual("object");
  });
});
