const expect = require("chai").expect;
const { User } = require("../../db");
const db = require("../../db");

const shopper1 = {
    firstName: "Grant",
    lastName: "Grant",
    email: `grant_Granted1234@gmail.com`,
    password: "12345",
    imgUrl: "",
    role: "shopper"
}

const admin1 = {
    firstName: "Mike",
    lastName: "Biby",
    email: "mb_adhk_admin@gmail.com",
    password: "ikdfY893",
    role: "admin"
}

function isEquivalent(obj1, obj2){
    // only loop through the first obj, because there
    // are unique id and time properties created
    const obj1Props = Object.getOwnPropertyNames(obj1)

    for(let i = 0; i < obj1Props.length; i++){
        if(obj1[obj1Props[i]] !== obj2[obj1Props[i]]){
            return false
        }
    }

    return true
}

describe("User model", ()=> {
    before(()=>{
        return db.dbSync({force: true})
    });
    afterEach(()=>{
        return db.dbSync({force: true})
    })
    describe("shopper and amdin", ()=>{
        it("can create a shopper instance", done=>{
            User.create(shopper1)
                .then(user=>{
                    expect(isEquivalent(shopper1, user)).to.equal(true)
                })
                .then(() => done())
                .catch(e => done(e))
        });
        it("can create a admin instance", done=>{
            User.create(admin1)
                .then(user=>{
                    expect(isEquivalent(admin1, user)).to.equal(true)
                })
                .then(()=>done())
                .catch(e=>done(e))
        });
        // need help on async test
        xit("can not create a user with invidate email", done=>{
            User.create({...shopper1, email: 'abcde'})
                .then(()=>{
                    expect.fail()
                })
                .then(()=>done())
                .catch(e=>done(e))
        })
    })
    
    
})