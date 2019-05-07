const express = require('express');
const db = require('../../db/models');
const Order = db.Order;

const router = express.Router();

router.get('/user/:userId', (req, res, next) => {
    Order.findAll({where: {userId: req.params.userId}},
                  {order: [['orderNumber', 'DESC']]})
    .then((orders) => res.json(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Order.findOne({where: {id: req.params.id}})
        .then((order) => res.json(order))
        .catch(next);
});

router.post('/user/:userId', (req, res, next) => {
    //req.body is expecting {userId: 123}
    Order.createOrder({userId: req.params.userId})
    .then((order) => res.json(order))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
    Order.update({status: req.body.status}, 
        {returning: true, where: {id: req.params.id}})
    .then(([ rowsUpdate, [updatedOrder] ]) => res.json(updatedOrder))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Order.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
