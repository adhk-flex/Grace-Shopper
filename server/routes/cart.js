const express = require('express');
const db = require('../../db/models');
const Cart = db.Cart;

const router = express.Router();

router.get('/', (req, res, next) => {
    Cart.findAll()
    .then((carts) => res.json(carts))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    if(req.params.id){
        Cart.findOne({where: {id: req.params.id}})
        .then((cart) => res.json(cart))
        .catch(next);
    }
});

router.post('/', (req, res, next) => {
    Cart.create(req.body)
    .then((cart) => res.json(cart))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    if(req.params.id){
        Cart.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
    }
});


module.exports = router

