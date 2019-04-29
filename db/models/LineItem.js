const db = require("../db");
const { Sequelize } = db;

const LineItem = db.define("lineItem", {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "Item quantity must be a positive integer"
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        validate: {
            min: {
                args:  [0],
                msg: "Price must be a positive number"
            }
        }
    }
});

module.exports = LineItem;
