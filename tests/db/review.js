const expect = require("chai").expect;
const { Review, Product, User } = require("../../db");
const db = require("../../db")

const testReview1 = {
    content: "This product is awesome!",
    stars: 5,
}

const testReview2 = {
    content: "This product is OK",
    stars: 3,
}

describe("review model", ()=>{
    describe("review model", () => {
        it("can create a review with correct content and star given an review object", done=>{
            Review.create(testReview1)
                .then(review => {
                    expect(review.content).to.equal("This product is awesome!")
                    expect(review.stars).to.equal(5)
                })
                .then(()=>done())
                .catch(e=>done(e))
        })
        it("can create a review for a product", done=>{
            Product.findOne()
                .then(product=>{
                    Review.create({...testReview2, productId: product.id})
                        .then(review => {
                            expect(review.productId).to.equal(product.id)
                        })
                })
                .then(() => done())
                .catch(e => done(e))
        })
        it("can create a reivew from a user for a given product", done=>{
            User.findOne()
                .then(user=>{
                    Product.findOne()
                        .then(product=>{
                            Review.create({...testReview2, productId: product.id, userId: user.id})
                                .then(review => {
                                    expect(review.productId).to.equal(product.id)
                                    expect(review.userId).to.equal(user.id)
                                })
                        })
                })
                .then(()=> done())
                .catch(e=> done(e))
        })
    })
    
})

