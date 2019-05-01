const db = require("../db");
const { Sequelize } = db;

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have a first name"
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have a last name"
      }
    }
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have a user name"
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have an email address"
      },
      isEmail: {
        args: true,
        msg: "Please enter a valid email address"
      },
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
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have a role"
      },
      isIn: {
        args: [["shopper", "admin"]],
        msg: "User role must be either 'shopper' or 'admin'"
      }
    }
  },
});

module.exports = User;
