const db = require("./db");
const { Product, Category, LineItem, Cart, Order, Address, User, CreditCard, Review } = require("./models");

const dbSync = dropTables => {
  return db
    .authenticate()
    .then(() => db.sync({ force: dropTables }))
    .then(() => console.log("DB SYNC COMPLETE"));
};

module.exports = { dbSync, Product, Category, LineItem, Cart, Order, Address, User, CreditCard, Review };
