const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const LineItem = require("./LineItem");

Product.belongsTo(Category);
Category.hasMany(Product);

LineItem.belongsTo(Product);
Product.hasMany(LineItem);

LineItem.belongsTo(Cart);
Cart.hasMany(LineItem);

module.exports = { Product, Category, Cart, LineItem };
