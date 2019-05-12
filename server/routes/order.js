const express = require('express');
const db = require('../../db/models');
const Order = db.Order;
const User = db.User;
const router = express.Router();

router.get('/user/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }

    User.findOne({where: {id: req.params.userId}})
    .then((user)=>{
        if(user.role==='admin'){
            Order.findAll({order: [['orderNumber', 'ASC']]})
            .then((orders)=>res.json(orders))
            .catch(next)
        }
        else{
            Order.findAll({where: {userId: req.params.userId}},
                {order: [['orderNumber', 'DESC']]})
            .then((orders) => res.json(orders))
            .catch(next);
        }
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Order.findOne({where: {id: req.params.id}})
        .then((order) => res.json(order))
        .catch(next);
});

router.get('/status/:status', (req, res, next) => {
    Order.findAll({ where: { status: req.params.status }, include: [db.User] })
        .then(orders => res.json(orders))
        .catch(next);
});

router.get('/include/users', (req, res, next) => {
    Order.findAll({ include:[User], order: [["orderNumber", "DESC"]] })
        .then(orders => res.json(orders))
        .catch(next);
});

router.post('/user/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    //req.body is expecting {userId: 123}
    console.log('in route: ', req.params.userId)
    Order.createOrder({userId: req.params.userId})
    .then((order) => res.json(order))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
    Order.update(req.body, 
        {returning: true, where: {id: req.params.id}})
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Order.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
