const db = require("../db");
const { Sequelize } = db;

const [amex, visa, mastercard, discover] = [
  "amex",
  "visa",
  "mastercard",
  "discover"
];

const CreditCard = db.define("creditCard", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "CC info must have a first name"
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "CC info must have a last name"
      }
    }
  },
  cardType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [[amex, visa, mastercard, discover]],
        msg: "Invalid credit card type"
      }
    }
  },
  number: {
    type: Sequelize.STRING,
    validate: {
      correctNumFormat(num) {
        if (this.cardType === amex) {
          if (!/^3(4|7)/.test(num)) {
            throw new Error("Incorrect card number for Amex");
          }
          if (num.length !== 15) {
            throw new Error("Incorrect length for Amex card number");
          }
        } else {
          if (num.length !== 16) {
            throw new Error("Incorrect length for card number");
          }

          if (this.cardType === visa)
            if (!num.startsWith("4"))
              throw new Error("Incorrect card number for Visa");
          if (this.cardType === mastercard)
            if (!/^5(1|5)/)
              throw new Error("Incorrect card number for MasterCard");
          if (this.cardType === discover) {
            if (!num.startsWith("6011"))
              throw new Error("Incorrect card number for Discover");
          }
        }
      }
    }
  },
  expMonth: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      oneThruTwelve(month) {
        if (month < 1 || month > 12)
          throw new Error("Month must be between 1 and 12");
      }
    }
  },
  expYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      validYear(year) {
        if (year < 2019) throw new Error("Card expiry has passed");
      }
    }
  },
  cvv: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      validCVV(cvv) {
        if (this.cardType === amex) {
          if (cvv.length !== 4) throw new Error("Invalid CVV for amex");
        } else {
          if (cvv.length !== 3)
            throw new Error(`Invalid CVV for ${this.cardType}`);
        }
      }
    }
  }
});

module.exports = CreditCard;
