const expect = require("chai").expect;
const { Order, User, LineItem, Cart, Product } = require("../../../db/models");

const doFirst = () => {
  return User.findOne()
    .then(user => Cart.findOne({ where: { userId: user.id } }))
    .then(cart =>
      Product.findOne().then(product =>
        Promise.all([
          LineItem.createLineItem({
            quantity: 1,
            price: product.price,
            name: product.name,
            productNumber: product.productNumber,
            stockStatus: product.stockStatus,
            imgUrl: product.imgUrl,
            productId: product.id,
            cartId: cart.id
          }),
          LineItem.createLineItem({
            quantity: 1,
            price: product.price,
            name: product.name,
            productNumber: product.productNumber,
            stockStatus: product.stockStatus,
            imgUrl: product.imgUrl,
            productId: product.id,
            cartId: cart.id
          })
        ])
      )
    )
    .catch(e => console.log(e));
};

describe("Order.createOrder", () => {
  it("is a function", () => {
    doFirst().then(() => expect(typeof Order.createOrder).to.equal("function"));
  });

  xit("takes a user and returns an order object", () => {
    doFirst()
      .then(() => User.findOne())
      .then(user => Order.createOrder(user))
      .then(order => expect(typeof order).to.equal("object"));
  });

  xit("puts a formatted order number on the order", () => {
    doFirst()
      .then(() => User.findOne())
      .then(user => Order.createOrder(user))
      .then(order => {
        expect(order.orderNumber.length).to.equal(8);
        expect(order.orderNumber.startsWith("GSHO")).to.equal(true);
        expect(order.orderNumber.includes("000"));
      });
  });

  xit("deletes the user's cart and creates a new empty cart", () => {
    doFirst()
      .then(() => User.findOne())
      .then(user =>
        Order.createOrder(user).then(() =>
          Cart.findOne({ where: { userId: user.id } })
        )
      )
      .then(cart => {
        return LineItem.findAll({ where: { cartId: cart.id } });
      })
      .then(cartItems => expect(cartItems.length).to.equal(0))
      .catch(e => {
        throw e;
      });
  });

  it("deducts quantity from product", () => {
    User.findOne()
      .then(user =>
        Cart.findOne({ where: { userId: user.id } }).then(cart => {
          Product.findOne().then(product => {
            const startQty = product.quantity;
            LineItem.create({
              cartId: cart.id,
              productId: product.id,
              quantity: 1,
              price: product.price,
              name: product.name,
              productNumber: product.productNumber,
              stockStatus: product.stockStatus,
              imgUrl: product.imgUrl
            }).then(item =>
              Order.createOrder(user).then(() =>
                expect(product.quantity).to.equal(startQty - item.quantity)
              )
            );
          });
        })
      )
      .catch(e => {
        throw e;
      });
  });
});
