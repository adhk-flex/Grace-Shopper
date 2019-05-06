const db = require("../db");
const { Sequelize } = db;

const Address = db.define("address", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  addressType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [["shipping", "billing"]],
        msg: "Address must be of type 'shipping' or 'billing'"
      }
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Address must have a first name"
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Address must have a last name"
      }
    }
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Address must contain at least one address line"
      }
    }
  },
  addressLine2: Sequelize.STRING,
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      lengthAndCharType(state) {
        if (state.length !== 2 || /[0-9]/g.test(state)) {
          throw new Error("State must be exactly two letters");
        }
      }
    }
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      lengthAndFormat(zip) {
        if (zip.length !== 5 || /[^0-9]/.test(zip)) {
          throw new Error("Zip code must be exactly five numbers");
        }
      }
    }
  }
});

module.exports = Address;
