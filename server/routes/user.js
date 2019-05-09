const express = require('express');
const db = require('../../db/models');
const User = db.User;

const router = express.Router();

router.get('/session', (req, res, next) => {
    if (req.session.userId) {
        User.findByPk(req.session.userId)
            .then(me => {
                res.json(me)
            })
            .catch(next);
    }
    else res.status(404);
});

router.delete('/logout', (req, res, next) => {
    req.session.destroy();
    res.status(204).end();
});

router.post('/login', (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            req.session.userId = user.id;
            res.json(user);
        })
        .catch(next);
});

router.put('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(user => {
        if (user) {
            req.session.userId = user.id;
            res.json(user);
        }
        else {
            const err = new Error('Incorrect user/password!');
            err.status = 401;
            next(err);
        }
    })
    .catch(next);
    
});

module.exports = router;
