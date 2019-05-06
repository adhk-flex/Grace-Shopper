const expect = require("chai").expect;
const { Address, User } = require("../../db");

const testShippingAddress1 = {
  addressType: "shipping",
  firstName: "Dave",
  lastName: "Siegel",
  addressLine1: "145 Cedar Lane",
  addressLine2: "Suite 210",
  city: "Englewood",
  state: "NJ",
  zip: "07631"
};

const testBillingAddress1 = {
  addressType: "billing",
  firstName: "Dave",
  lastName: "Siegel",
  addressLine1: "145 Cedar Lane",
  addressLine2: "Suite 210",
  city: "Englewood",
  state: "NJ",
  zip: "07631"
};

const testShippingAddress2 = {
  addressType: "shipping",
  firstName: "Dave",
  lastName: "Siegel",
  addressLine1: "145 Cedar Lane",
  addressLine2: "Suite 220",
  city: "Englewood",
  state: "NJ",
  zip: "07631"
};

const testAddresses = [testShippingAddress1, testBillingAddress1];

const doFirst = () => {
  return User.findOne().then(user =>
    Promise.all(
      testAddresses.map(_address => {
        _address.userId = user.id;
        return Address.createAddress(_address);
      })
    )
  );
};

describe("address model", () => {
  it("can take an address object, and create an address", done => {
    doFirst()
      .then(addresses => addresses[0])
      .then(address => {
        expect(address.active).to.be.true;
        expect(
          !!address.firstName && !!address.lastName && !!address.zip
        ).to.equal(true);
        done();
      })
      .catch(e => done(e));
  });

  it("can create billing and shipping addresses", done => {
    doFirst()
      .then(addresses => {
        expect(addresses[0].addressType).to.equal("shipping");
        expect(addresses[1].addressType).to.equal("billing");
        done();
      })
      .catch(e => done(e));
  });

  it("can set a new active address", done => {
    doFirst()
      .then(() => User.findOne())
      .then(user => {
        testShippingAddress2.userId = user.id;
        return Address.createAddress(testShippingAddress2).then(() =>
          Address.findOne({
            where: { userId: user.id, active: true, addressType: "shipping" }
          }).catch(e => done(e))
        )
        .then(newAddress => {
            expect(newAddress.addressLine2).to.equal("Suite 220")
            done();
        })
      }).catch(e => done(e));
  });
});
