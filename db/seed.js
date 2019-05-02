const { Product, Category, User } = require("./models");
const { dbSync } = require("./index");
const faker = require("faker");

const pnGenerator = () => {
  let pn = "GSH";
  for (let i = 0; i < 6; i++) {
    pn += Math.floor(Math.random() * 10);
  }
  return pn;
};

const statuses = ["in stock", "out of stock"];
const roles = ["shopper", "admin"];

const seed = () => {
  return dbSync(true)
    .then(() =>
      Promise.all([
        Category.create({ name: "CAT 1" }),
        Category.create({ name: "CAT 2" }),
        Category.create({ name: "CAT 3" })
      ])
    )
    .then(categories => {
      const arr = new Array(20);
      return Promise.all(
        [...arr].map(() =>
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
    .then(() => {
      const arr = new Array(10);
      return Promise.all([
        [...arr].map((ele, idx) => 
          User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: `testpassword`,
            email: `test${idx}@email.com`,
            imgUrl: faker.image.avatar(),
            role: roles[Math.floor(Math.random() * 2)]
          })
        )
      ]);
    })
    .then(() => console.log("DB SEED COMPLETE"));
};

seed()
  .catch(e => {
    throw new Error(e.message);
  });
