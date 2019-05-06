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
            imgUrl: product.imgUrl,
            productId: product.id,
            cartId: cart.id
          }),
          LineItem.createLineItem({
            quantity: 1,
            price: product.price,
            name: product.name,
            productNumber: product.productNumber,
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
    expect(typeof Order.createOrder).to.equal("function");
  });

  xit("takes a user and returns an order object", () => {
    doFirst()
      .then(() => User.findOne())
      .then(user => Order.createOrder(user))
      .then(order => expect(typeof order).to.equal("object"))
      .catch(e => done(e));
  })

  xit("puts a formatted order number on the order", () => {
    doFirst()
      .then(() => User.findOne())
      .then(user => Order.createOrder(user))
      .then(order => {
        expect(order.orderNumber.length).to.equal(8);
        expect(order.orderNumber.startsWith("GSHO")).to.equal(true);
        expect(order.orderNumber.includes("000"));
      }).catch(e => done(e));
  });

  it("deletes the user's cart and creates a new empty cart", (done) => {
    doFirst()
      .then(() => User.findOne())
      .then(user =>
        Order.createOrder(user).then(() =>
          Cart.findOne({ where: { userId: user.id } })
        ).catch(e => done(e))
      )
      .then(cart => {
        return LineItem.findAll({ where: { cartId: cart.id } });
      })
      .then(cartItems => expect(cartItems.length).to.equal(0))
      .then(done())
      .catch(e => {
        done(e);
      });
  });

  it("deducts quantity from product", (done) => {
    User.findOne()
      .then(user =>
        Cart.findOne({ where: { userId: user.id } }).then(cart => {
          Product.findOne().then(product => {
            console.log(product.productNumber);
            const startQty = product.quantity;
            LineItem.create({
              cartId: cart.id,
              productId: product.id,
              quantity: 1,
              price: product.price,
              name: product.name,
              productNumber: product.productNumber,
              imgUrl: product.imgUrl
            }).then(item =>
              Order.createOrder(user).then(() =>
                expect(product.quantity).to.equal(startQty - item.quantity)
              ).catch(e => done(e))
            );
          });
        })
      )
      .catch(e => done(e));
  });
});
