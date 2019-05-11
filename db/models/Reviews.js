const db = require("../db");
const { Sequelize } = db;

const Review = db.define("review", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "please provide a review comment"
            }
        }
    },
    stars: {
        type: Sequelize.ENUM,
        values: [1, 2, 3, 4, 5],
        validate: {
            isInt: {
                args: true,
                msg: "must be an integer number"
            },
            min: {
                args: [[0]],
                msg: "must be large than zero"
            },
            max: {
                args: [[5]],
                msg: "must be smaller or equal to 5"
            }
            
        }
    }
});

module.exports = Review;