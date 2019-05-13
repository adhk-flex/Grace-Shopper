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

router.get('/cart/:cartId', (req, res, next) => {
    LineItem.findAll({where: {cartId: req.params.cartId}})
        .then((lineitems) => res.json(lineitems))
        .catch(next);
});

router.get('/order/:orderId', (req, res, next) => {
    LineItem.findAll({where: {orderId: req.params.orderId}})
        .then((lineitems) => res.json(lineitems))
        .catch(next);
});

router.post('/', (req, res, next) => {
    LineItem.createLineItem(req.body)
    .then((lineitem) => res.json(lineitem))
    .catch(next);
});

router.post('/:orderId', (req, res, next) => {
    LineItem.create({...req.body, orderId: req.params.orderId})
    .then((lineitem) => res.json(lineitem))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
    LineItem.update({quantity: req.body.quantity}, 
                {returning: true, where: {id: req.params.id}})
    .then(([ rowsUpdate, [updatedLineItem] ]) => res.json(updatedLineItem))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    LineItem.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
