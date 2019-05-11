const express = require('express');
const db = require('../../db/models');
const Category = db.Category;

const router = express.Router();

router.get('/', (req, res, next) => {
    Category.findAll({ order: [["name", "asc"]] })
    .then((categories) => res.json(categories))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Category.findOne({where: {id: req.params.id}})
        .then((category) => res.json(category))
        .catch(next);
});

router.post('/', (req, res, next) => {
    Category.create(req.body)
    .then((category) => res.json(category))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Category.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

module.exports = router;
