const express = require('express');
const db = require('../../db/models');
const Order = db.Order;
const User = db.User;
const Cart = db.Cart;
const LineItem = db.LineItem;
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

router.get('/status/:status/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    User.findOne({where: {id: req.params.userId}})
    .then((user)=>{
        if(user.role==='admin'){
            Order.findAll({where: { status: req.params.status }, include: [User], order: [['orderNumber', 'ASC']]})
            .then((orders)=>res.json(orders))
            .catch(next)
        }
        else{
            throw new Error('NOT AN ADMIN');
        }
    })
    .catch(next);
    // Order.findAll({ where: { status: req.params.status }, include: [db.User] })
    //     .then(orders => res.json(orders))
    //     .catch(next);
});

router.get('/include/users/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    User.findOne({where: {id: req.params.userId}})
    .then((user)=>{
        if(user.role==='admin'){
            Order.findAll({include: [User], order: [['orderNumber', 'ASC']]})
            .then((orders)=>res.json(orders))
            .catch(next)
        }
        else{
            throw new Error('NOT AN ADMIN');
        }
    })
    .catch(next);
});

router.post('/user/:userId', (req, res, next) => {
    let order = {};
    console.log(req.params.userId)
    if(req.params.userId==='undefined'){
        console.log('I am in the order post express route - unauth');
        Order.create({status: "created"})
            .then((order)=>{
                console.log('order got created', order)
                res.json(order)
            })
            .catch(next);
    }
    else{
        Order.createOrder({userId: req.params.userId})
            .then((neworder) => {
                order=neworder.dataValues;
                return order;
            })
            .then(()=>{
                console.log('1 then')
                return Cart.findOne({ where: { userId: order.userId } })
            })
            .then(cart =>{
                console.log('2 then')
                return LineItem.update({ orderId: order.id }, { where: { cartId: cart.id } })
            })
            .then(() => {
                console.log('3 then')
                return LineItem.findAll({ where: { orderId: order.id } })
            })
            .then(orderItems => {
                console.log('4 then')
                order.totalAmount = orderItems.reduce(
                (acc, item) => (acc += item.price * item.quantity),
                0
                );
                return order;
            })
            .then((order) => {
                console.log('5 then', order)
                //return order.save();
                return Order.update(order, {returning: true, where: {id: order.id}})
            })
            .then(([updatedrows, [neworder]]) => {
                console.log('neworder', neworder);
                order = neworder;
                console.log('6 then', order.userId);
                return Cart.destroy({ where: { userId: order.userId } })})
                .catch((error)=>console.log(error))
            .then(() => {
                console.log('7 then');
                Cart.create({ userId: order.userId })
            })
            .then(() =>  {
                console.log('8 then')
                return Order.findOne({where: {id: order.id}})
                        .then((order)=>res.json(order))
            })
            .catch(next);
    }
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
