const express = require('express');
const db = require('../../db/models');
const CreditCard = db.CreditCard;

const router = express.Router();

router.get('/user/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    CreditCard.findOne({
                    where: { active: true, 
                            userId: req.params.userId }})
    .then((card) => res.json(card))
    .catch(next);
});

router.post('/user/:userId', (req, res, next) => {
    if(req.params.userId !== req.session.userId){
        res.send(500);
    }
    let argument = {
        userId: req.params.userId,
        cardType: req.body.cardType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        number: req.body.number,
        expMonth: req.body.expMonth,
        expYear: req.body.expYear,
        cvv: req.body.cvv
    }
    CreditCard.createCard(argument)
        .then((card) => res.json(card))
        .catch(next);
});

module.exports = router;
