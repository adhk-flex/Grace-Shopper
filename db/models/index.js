const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const LineItem = require("./LineItem");
const User = require("./User");
const Order = require("./Order");
const Address = require("./Address");

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

Address.belongsTo(User);
User.hasMany(Address);

//user hooks
User.addHook("afterCreate", user =>
  Cart.create({ status: "pending", userId: user.id })
);

//order hooks and methods
Order.createOrder = user => {
  return Cart.findOne({ where: { userId: user.id } })
    .then(cart => LineItem.findAll({ where: { cartId: cart.id } }))
    .then(items =>
      Promise.all(
        items.map(item =>
          Product.findOne({ where: { id: item.productId } }).then(product => {
            if (product.quantity < item.quantity)
              throw new Error(
                `Quantity ${item.quantity} of ${item.name} not available`
              );
            else return product;
          })
        )
      )
    )
    .then(() => Order.create({ status: "purchased", userId: user.id }));
};

Order.addHook("afterCreate", order => {
  console.log("ORDER", order.dataValues)
  return Cart.findOne({ where: { userId: order.userId } })
    .then(cart =>
      LineItem.update({ orderId: order.id }, { where: { cartId: cart.id } })
    )
    .then(() => LineItem.findAll({ where: { orderId: order.id } }))
    .then(orderItems => {
      order.totalAmount = orderItems.reduce(
        (acc, item) => (acc += item.price * item.quantity),
        0
      );
      return order.save();
    })
    .then(() => Cart.destroy({ where: { userId: order.userId } }))
    .then(() => Cart.create({ status: "pending", userId: order.userId }));
});

//line item create method
LineItem.createLineItem = item => {
  return LineItem.findOne({
    where: { productId: item.productId, cartId: item.cartId }
  }).then(prevItem => {
    if (prevItem) {
      return prevItem
        .update({ quantity: prevItem.quantity + item.quantity })
        .then(() => Product.findOne({ where: { id: item.productId } }))
        .then(product =>
          product.update({ quantity: product.quantity - item.quantity })
        );
    } else {
      return LineItem.create(item)
        .then(() => Product.findOne({ where: { id: item.productId } }))
        .then(product =>
          product.update({ quantity: product.quantity - item.quantity })
        );
    }
  });
};

module.exports = { Product, Category, Cart, LineItem, User, Order };
