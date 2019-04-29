const db = require("../db");
const { Sequelize } = db;

const Cart = db.define("cart", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["pending", "checkout"]],
      notEmpty: true
    }
  }
});

module.exports = Cart;
