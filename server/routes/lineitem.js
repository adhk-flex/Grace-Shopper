const express = require('express');
const db = require('../../db/models');
const LineItem = db.LineItem;

const router = express.Router();

router.get('/', (req, res, next) => {
    LineItem.findAll()
    .then((lineitems) => res.json(lineitems))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    LineItem.findOne({where: {id: req.params.id}})
        .then((lineitem) => res.json(lineitem))
        .catch(next);
    
});

router.get('/:cartid', (req, res, next) => {
    LineItem.findOne({where: {cartId: req.params.id}})
        .then((lineitem) => res.json(lineitem))
        .catch(next);
    
});

router.post('/', (req, res, next) => {
    LineItem.create(req.body)
    .then((lineitem) => res.json(lineitem))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    LineItem.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
    
});

module.exports = router

