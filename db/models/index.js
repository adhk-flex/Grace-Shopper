const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const LineItem = require("./LineItem");
const User = require("./User");
const Order = require("./Order");

//associations
Product.belongsTo(Category);
Category.hasMany(Product);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

Cart.hasMany(LineItem);
LineItem.belongsTo(Cart);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);
 
Cart.belongsTo(User);
User.hasOne(Cart);

Order.belongsTo(User);
User.hasMany(Order);

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
    .then(() => LineItem.findAll({ where: { orderId: order.id } }))
    .then(orderItems => {
      order.totalAmount = orderItems.reduce((acc, item) => acc += item.price * item.quantity, 0);
      return order.save();
    })
    .then(() => Cart.destroy({ where: { userId: order.userId } }))
    .then(() => Cart.create({ status: "pending", userId: order.userId }))
    .catch(e => { throw e });
});

module.exports = { Product, Category, Cart, LineItem, User, Order };
