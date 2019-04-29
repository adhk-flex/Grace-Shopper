const db = require("./db");
const { Product, Category, LineItem, Cart } = require("./models");
const seed = require("./seed");

const dbSyncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => console.log("DB SYNC COMPLETE"))
    .then(() => seed())
    .then(() => console.log("DB SEEDED"));
};

module.exports = { dbSyncAndSeed, Product, Category, LineItem, Cart };
