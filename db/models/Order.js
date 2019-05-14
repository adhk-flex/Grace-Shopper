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
            return `GSHO${pad}${num}`;
        },
        set(num){
            const _num = num.toString();
            const start = _num.match(/[1-9]/).index;
            this.setDataValue('orderNumber', _num.slice(start))
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
                args: [["created", "processing", "cancelled", "closed"]],
                msg: "Order status must be created, processing, cancelled or closed"
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
    },
});

module.exports = Order;
