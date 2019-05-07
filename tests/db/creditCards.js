const expect = require("chai").expect;
const { CreditCard, User } = require("../../db");

describe("credit card model", () => {
  it("can use create to return a cc object", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "4444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(cc => {
        expect(cc.number).to.equal("4444333322221111");
        done();
      })
      .catch(e => done(e));
  });
  it("will not create a cc if the number is the incorrect length", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "444433332222111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card length");
      })
      .catch(e => {
        if (e.message === "did not throw error on incorrect card length")
          done(e);
      });
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "amex",
          number: "3444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "5222"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card length");
      })
      .catch(e => {
        if (e.message === "did not throw error on incorrect card length")
          done(e);
        else done();
      });
  });

  it("will throw an error if card number begins with the wrong number(s)", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "5444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card number");
      })
      .then(() => User.findOne())
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "amex",
          number: "324433332222111",
          expMonth: 11,
          expYear: 2021,
          cvv: "5222"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card number");
      })
      .then(() => User.findOne())
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "mastercard",
          number: "2444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card number");
      })
      .then(() => User.findOne())
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "discover",
          number: "2444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect card number");
      })
      .catch(e => {
        if (e.message === "did not throw error on incorrect card number")
          done(e);
        else done();
      });
  });

  it("will throw an error if CVV is the incorrect length", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "4444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "5222"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect cvv");
      })
      .catch(e => {
        if (e.message === "did not throw error on incorrect cvv") done(e);
      });

    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "amex",
          number: "374433332222111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("did not throw error on incorrect cvv");
      })
      .catch(e => {
        if (e.message === "did not throw error on incorrect cvv") done(e);
        else done();
      });
  });

  it("will throw an error if the expiration date has passed", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "4444333322221111",
          expMonth: 1,
          expYear: 2019,
          cvv: "522"
        })
      )
      .then(() => {
        throw new Error("wrong error");
      })
      .catch(e => {
        if(e.message === "wrong error") done(e);
        else done();
      });
  });

  it("can replace an active card by setting its active field to false", done => {
    User.findOne()
      .then(user =>
        CreditCard.createCard({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          cardType: "visa",
          number: "4444333322221111",
          expMonth: 11,
          expYear: 2021,
          cvv: "522"
        })
          .then(() =>
            CreditCard.createCard({
              userId: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              cardType: "amex",
              number: "374433332222111",
              expMonth: 11,
              expYear: 2021,
              cvv: "5222"
            })
          )
          .then(() =>
            CreditCard.findAll({ where: { userId: user.id, active: true } })
          )
      )
      .then(results => {
        expect(results.length).to.equal(1);
        const card = results[0];
        expect(card.cardType).to.equal("amex");
        done();
      })
      .catch(e => done(e));
  });
});
