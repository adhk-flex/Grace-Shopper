const { dbSyncAndSeed } = require("./db");
const { Product, Category } = require("./models")

module.exports = { dbSyncAndSeed, Product, Category };
