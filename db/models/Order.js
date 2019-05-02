const db = require("../db");
const { Sequelize } = db;

const Order = db.define("order", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Order must have a status"
            },
            isIn: {
                args: [["purchased", "shipped"]],
                msg: "Order status must be either 'purchased' or 'shipped'"
            }
        }
    },
    totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            min: {
                args: [[0]],
                msg: "Total must be a positive number"
            }
        }
    }
});

module.exports = Order;
