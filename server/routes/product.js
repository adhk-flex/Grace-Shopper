const express = require('express');
const db = require('../../db/models');
const Product = db.Product;
const Category = db.Category;

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.findAll({
        order: [['name', 'ASC']]
    })
    .then((products) => res.json(products))
    .catch(next);
});

router.get('/search/:srchVal/:pgIdx?', (req, res, next) => {
    const srchVal = req.params.srchVal.toLowerCase();
    Product.findAll({ order:[["name", "asc"]] })
        .then((products) => products.filter(product => 
            product.name.toLowerCase().includes(srchVal) 
            || product.description.toLowerCase().includes(srchVal)
            || product.productNumber.toLowerCase().includes(srchVal)
            )
        )
        .then(results => {
            if(req.params.pgIdx){
                const end = req.params.pgIdx * 10;
                const start = end - 10;
                res.send(results.slice(start, end));
            } else {
                res.send(results);
            }
        })
        .catch(next);
});

router.get('/category/:catId/:pgIdx?', (req, res, next) => {
    console.log("HIT CATEGORY GET")
    Product.findAll({ where: { categoryId: req.params.catId }, order: [["name", "asc"]] })
        .then((products) => {
            if(req.params.pgIdx){
                const end = req.params.pgIdx * 10;
                const start = end - 10 
                res.send(products.slice(start, end));
            } else { 
                res.send(products);
             }
        })
        .catch(next);
});

router.get('/category/:catId/search/:srchVal/:pgIdx?', (req, res, next) => {
    const { srchVal, pgIdx } = req.params;
    Product.findAll({ where: { categoryId: req.params.catId }, order: [["name", "asc"]] })
        .then((products) => {
            const results = products.filter(product => 
                product.name.toLowerCase().includes(srchVal) 
                || product.description.toLowerCase().includes(srchVal)
                || product.productNumber.toLowerCase().includes(srchVal)
                )
            if(pgIdx){
                const end = req.params.pgIdx * 10;
                const start = end - 10;
                res.send(results.slice(start, end));
            } else {
                res.send(results);
            }
        })
        .catch(next);
});

router.get('/:pgIdx', (req, res, next) => {
    const end = req.params.pgIdx * 10;
    const start = end - 10
    Product.findAll({
        order: [['name', 'ASC']]
    })
        .then(products => res.json(products.slice(start, end)))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Product.findOne({where: {id: req.params.id}})
        .then((product) => res.json(product))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    Product.destroy({where: {id: req.params.id}})
        .then(() => res.send(204))
        .catch(next);
});

router.post('/', (req, res, next)=>{
    return Promise.all([ Product.create(req.body),
                         Category.findOne({where: {name: req.body.categoryName}}) ])
    .then(([product, category]) => {
        product.update({categoryId: category.id});
        return product;
    })
    .then((product) => res.json(product))
    .catch((error) => console.log(error));
});

module.exports = router;
