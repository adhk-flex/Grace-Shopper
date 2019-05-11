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
        type: Sequelize.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: "must be an integer number"
            },
            min: {
                args: [[0]],
                msg: "must be large than or equal to zero"
            },
            max: {
                args: [[5]],
                msg: "must be smaller or equal to 5"
            }
            
        }
    }
});

module.exports = Review;