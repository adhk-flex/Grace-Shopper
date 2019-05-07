const express = require('express');
const db = require('../../db/models');
const Address = db.Address;

const router = express.Router();

router.get('/:type/user/:userId', (req, res, next) => {
    Address.findOne({
                    where: { addressType: req.params.type, 
                            active: true, 
                            userId: req.params.userId }})
    .then((address) => res.json(address))
    .catch(next);
});

router.post('/:type/user/:userId', (req, res, next) => {
    let argument = {
        addressType: req.params.type,
        userId: req.params.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }
    Address.createAddress(argument)
        .then((address) => res.json(address))
        .catch(next);
});

module.exports = router;
