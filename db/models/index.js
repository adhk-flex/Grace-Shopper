const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const LineItem = require("./LineItem");
const User = require("./User");
const Order = require("./Order");

//associations
Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsToMany(Cart, { through: LineItem });

Cart.belongsTo(User);
User.hasOne(Cart);

Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order, { through: LineItem });

//hooks
User.addHook("afterCreate", user =>
  Cart.create({ status: "pending", userId: user.id })
);

Order.createOrder = user => {
  return Order.create({
    status: "purchased",
    userId: user.id
  });
};

Order.addHook("afterCreate", order => {
  Cart.findOne({ where: { userId: order.userId } })
    .then(cart =>
      LineItem.update({ orderId: order.id }, { where: { cartId: cart.id } })
    )
    .then(() => Cart.destroy({ where: { userId: order.userId } }))
    .then(() => Cart.create({ status: "pending", userId: order.userId }));
});

module.exports = { Product, Category, Cart, LineItem, User, Order };
