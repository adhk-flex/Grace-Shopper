const db = require("../db");
const { Sequelize } = db;

const Product = db.define("product", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
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
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Please enter description text."
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [[0]],
        msg: "Price must be a positive number."
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
  stockStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Please enter a stock status."
      },
      isIn: {
        args: [["in stock", "out of stock"]],
        msg: "Product stock status must be 'in stock' or 'out of stock'."
      }
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [[0]],
        msg: "Product quantity must be a positive number."
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

module.exports = Product;
