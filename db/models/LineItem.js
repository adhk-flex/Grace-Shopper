const db = require("../db");
const { Sequelize } = db;

const LineItem = db.define("lineItem", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [[0]],
        msg: "Item quantity must be a positive integer"
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: {
        args: [[0]],
        msg: "Price must be a positive number"
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Please enter product name"
      }
    }
  },
  productNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Please enter a product number."
      }
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      urlOrBlank(url) {
        if (!Sequelize.Validator.isURL(url) && url.length > 0)
          throw new Error(
            "Please enter a valid Image URL or leave the field bank."
          );
      }
    }
  }
});

module.exports = LineItem;
