const express = require('express');
const db = require('../../db/models');
const Product = db.Product;
const Category = db.Category;

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.findAll()
    .then((products) => res.json(products))
    .catch(next);
});

router.get('/search/:srchVal', (req, res, next) => {
    const srchVal = req.params.srchVal.toLowerCase();
    Product.findAll()
        .then((products) => products.filter(product => 
            product.name.toLowerCase().includes(srchVal) 
            || product.description.toLowerCase().includes(srchVal)
            || product.productNumber.toLowerCase().includes(srchVal)
            )
        )
        .then(results => res.send(results))
        .catch(next);
});

router.get('/category/:catId/:srchVal?', (req, res, next) => {
    const srchVal = req.params.srchVal 
    ? req.params.srchVal.toLowerCase() : undefined;
    Product.findAll({ where: { categoryId: req.params.catId } })
        .then((products) => {
            if(!srchVal){
                res.send(products);
            } else { 
                const results = products.filter(product => 
                    product.name.toLowerCase().includes(srchVal) 
                    || product.description.toLowerCase().includes(srchVal)
                    || product.productNumber.toLowerCase().includes(srchVal)
                    )
                res.send(results);
             }
        })
        .catch(next);
});

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
