const expect = require("chai").expect;
const { Product } = require("../../db");

describe("Product stock status update", () => {
  it("Changes stock status to 'out of stock' when qty updates to 0", done => {
    Product.findOne()
      .then(product => product.update({ quantity: 0 }))
      .then(product => {
        console.log(product.productNumber, product.stockStatus);
        expect(product.stockStatus).to.equal("out of stock");
      })
      .then(() => done())
      .catch(e => done(e));
  });
});
