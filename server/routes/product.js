const express = require('express');
const db = require('../../db/models');
const Product = db.Product;
const Category = db.Category;

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.findAll()
    .then((products) => res.json(products))
    .catch(next)
});

module.exports = router;
