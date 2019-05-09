const express = require('express');
const db = require('../../db/models');
const Cart = db.Cart;

const router = express.Router();

router.get('/', (req, res, next) => {
    Cart.findAll()
    .then((carts) => res.json(carts))
    .catch(next);
});

router.get('/user/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    Cart.findOne({where: {userId: req.params.userId}})
        .then((cart) => res.json(cart))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Cart.create(req.body)
    .then((cart) => res.json(cart))
    .catch(next);
});

//Only updates the status
router.put('/:id', (req, res, next) => {
    Cart.update({status: req.body.status}, 
                {returning: true, where: {id: req.params.id}})
    .then(([ rowsUpdate, [updatedCart] ]) => res.json(updatedCart))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Cart.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
