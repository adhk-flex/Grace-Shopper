const expect = require("chai").expect;
const { Order, User, LineItem, Cart, Product } = require("../../../db/models");

beforeEach(() => {
  console.log("Before")
  User.findAll({ order: [["lastName", "asc"]] })
    .then(users => users[0])
    .then(user => Cart.findOne({ where: { userId: user.id } }))
    .then(cart => {
      return Product.findAll().then(products =>
        Promise.all([LineItem.destroy({ where: {} }),
          LineItem.create({
            quantity: 1,
            price: products[0].price,
            name: products[0].name,
            productNumber: products[0].productNumber,
            stockStatus: products[0].stockStatus,
            imgUrl: products[0].imgUrl,
            cartId: cart.id
          }),
          LineItem.create({
            quantity: 1,
            price: products[1].price,
            name: products[1].name,
            productNumber: products[1].productNumber,
            stockStatus: products[1].stockStatus,
            imgUrl: products[1].imgUrl,
            cartId: cart.id
          })
        ])
      );
    })
    .catch(e => console.log(e));
});

describe("Order.createOrder", () => {
  it("is a function", () => {
    expect(typeof Order.createOrder).to.equal("function");
  });

  it("takes a user and returns an order object", () => {
    User.findAll({ order: [["lastName", "asc"]] })
      .then(users => users[0])
      .then(user => Order.createOrder(user))
      .then(order => expect(typeof order).to.equal("object"));
  });

  it("puts a formatted order number on the order", () => {
    User.findAll({ order: [["lastName", "asc"]] })
      .then(users => users[0])
      .then(user => Order.createOrder(user))
      .then(order => console.log(order.orderNumber))
  })

  // it("deletes the user's cart and creates a new empty cart", () => {
  //   User.findAll({ order: [["lastName", "asc"]] })
  //     .then(users => users[0])
  //     .then(user => Order.createOrder(user).then(() => Cart.findOne({ where: { userId: user.id } })))
  //     .then(cart =>{
  //       return LineItem.findAll({ where: { cartId: cart.id } })
  //     }) 
  //     .then(cartItems => expect(cartItems.length).to.equal(0))
  //     .catch(e => {
  //       throw e;
  //     })
  // });

});
