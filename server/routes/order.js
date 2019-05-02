const express = require('express');
const db = require('../../db/models');
const Order = db.Order;

const router = express.Router();

router.get('/user/:userId', (req, res, next) => {
    Order.findAll({where: {userId: req.params.userId}})
    .then((orders) => res.json(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Order.findOne({where: {id: req.params.id}})
        .then((order) => res.json(order))
        .catch(next);
});

router.post('/', (req, res, next) => {
    //req.body is expecting {userId: 123}
    Order.createOrder(req.body)
    .then((cart) => res.json(cart))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
    //req.body is expecting {status: shipped}
    Order.findOne({where: {id: req.params.id}})
    .then((order) => order.update(req.body))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Order.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
