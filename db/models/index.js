const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const LineItem = require("./LineItem");
const User = require("./User");
const Order = require("./Order");
const Address = require("./Address");
const CreditCard = require("./CreditCard");

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

Order.belongsTo(Address, { as: "shippingAddress" });
Order.belongsTo(Address, { as: "billingAddress" });

CreditCard.belongsTo(User);
User.hasMany(CreditCard);

Order.belongsTo(CreditCard);
CreditCard.hasMany(Order);

//user hooks
User.addHook("afterCreate", user => Cart.create({ userId: user.id }));

//product hooks
Product.addHook("beforeValidate", product => {
  if (product.quantity === 0) {
    product.stockStatus = "out of stock";
  }
});


//TODO FIND AND ASSIGN ADDRESSES AND CC
//order hooks and methods
Order.createOrder = userId => {
  console.log('this is what comes into Order.createOrder in the db model: ', userId.userId)
  return Cart.findOne({ where: { userId: userId.userId} })
    .then(cart => LineItem.findAll({ where: { cartId: cart.id } }))
    .then(items =>
      Promise.all(
        items.map(item =>
          Product.findOne({ where: { id: item.productId } }).then(product => {
            if (product.quantity < item.quantity)
              throw new Error(
                `Quantity ${item.quantity} of ${item.name} not available`
              );
            else
              return product.update({
                quantity: product.quantity - item.quantity
              });
          })
        )
      )
    )
    .then(() => Promise.all([
      Address.findOne({ where: { userId: userId.userId, addressType: "shipping", active: true } }),
      Address.findOne({ where: { userId: userId.userId, addressType: "billing", active: true } }),
      CreditCard.findOne({ where: { userId: userId.userId, active: true } })
    ]))
    .then(([shippingAddress, billingAddress, creditCard]) => Order.create({ status: "purchased", userId: userId.userId, shippingAddressId: shippingAddress.id, billingAddressId: billingAddress.id, creditCardId: creditCard.id }));
};

Order.addHook("afterCreate", order => {
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
    .then(() => Cart.create({ userId: order.userId }));
});

//line item create method
LineItem.createLineItem = item => {
  return LineItem.findOne({
    where: { productId: item.productId, cartId: item.cartId }
  }).then(prevItem => {
    if (prevItem) {
      return prevItem.update({ quantity: prevItem.quantity + item.quantity });
    } else {
      return LineItem.create(item);
    }
  });
};

//address create method
Address.createAddress = address => {
  return Address.findOne({
    where: {
      userId: address.userId,
      active: true,
      addressType: address.addressType
    }
  }).then(foundAddress => {
    if (foundAddress) {
      return foundAddress
        .update({ active: false })
        .then(() => Address.create(address));
    } else {
      return Address.create(address);
    }
  });
};

//credit card create method

CreditCard.createCard = card => {
  return CreditCard.findOne({
    where: { userId: card.userId, active: true }
  }).then(foundCard => {
    if (foundCard) {
      return foundCard
        .update({ active: false })
        .then(() => CreditCard.create(card));
    } else {
      return CreditCard.create(card);
    }
  });
};

module.exports = {
  Product,
  Category,
  Cart,
  LineItem,
  User,
  Order,
  Address,
  CreditCard
};
