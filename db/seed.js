const { Product, Category } = require("./models");
const faker = require("faker");

const pnGenerator = () => {
  let pn = "GSH";
  for (let i = 0; i < 6; i++) {
    pn += Math.floor(Math.random() * 10);
  }
  return pn;
};

const statuses = ["in stock", "out of stock"];

const seed = () => {
  return Promise.all([
    Category.create({ name: "CAT 1" }),
    Category.create({ name: "CAT 2" }),
    Category.create({ name: "CAT 3" })
  ])
    .then(categories => {
      const arr = new Array(20);
      return Promise.all(
        [...arr].map(prod =>
          Product.create({
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            price: faker.commerce.price(),
            productNumber: pnGenerator(),
            stockStatus: statuses[Math.floor(Math.random() * 2)],
            quantity: Math.floor(Math.random() * 100),
            imgUrl: faker.image.abstract(),
            categoryId: categories[Math.floor(Math.random() * 3)].id
          })
        )
      );
    })
    .catch(e => {
      throw new Error(e.message);
    });
};

module.exports = seed;
