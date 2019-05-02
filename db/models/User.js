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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "User must have an email address"
      },
      isEmail: {
        args: true,
        msg: "Please enter a valid email address"
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      minLength(password){
        if(password.length < 5){
          throw new Error("Password must be at least 5 characters.");
        }
      }
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg",
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
  }
});

module.exports = User;
