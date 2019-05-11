const express = require('express');
const db = require('../../db/models');
const Review = db.Review;

const router = express.Router();

router.get('/', (req, res, next) => {
  Review.findAll()
    .then((reviews) => res.json(reviews))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  Review.findAll({where: {userId: req.params.userId}})
    .then((reviews) => res.json(reviews))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Review.findAll({where: {productId: req.params.productId}})
    .then((reviews) => res.json(reviews))
    .catch(next);
});

router.post('/:productId/:userId', (req, res, next) => {
  let argument = {
    content: req.body.content,
    starts: req.body.start,
    userId: req.params.userId,
    productId: req.params.productId
  }
  Review.create(argument)
    .then((reviews) => res.json(reviews))
    .catch(next);
})

module.exports = router;