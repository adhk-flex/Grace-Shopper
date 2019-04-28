const express = require('express');
const db = require('../../db/models');
const Product = db.Product;

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.findAll()
    .then((products) => res.json(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    if(req.params.id){
        Product.findOne({where: {id: req.params.id}})
        .then((product) => res.json(product))
        .catch(next);
    }
});

router.delete('/:id', (req, res, next) => {
    if(req.params.id){
        Product.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
    }
});

module.exports = router;
