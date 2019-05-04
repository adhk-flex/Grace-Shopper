const db = require("../db");
const { Sequelize } = db;

const Order = db.define("order", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    orderNumber: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        get(){
            const num = this.getDataValue("orderNumber").toString();
            let pad = "";
            if(num.length < 4){
                for(let i = 0; i < 4 - num.length; i++){
                    pad += "0";
                }
            }
            return `GSOH${pad}${num}`;
        }
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
