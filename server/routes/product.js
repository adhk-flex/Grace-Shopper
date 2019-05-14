const express = require('express');
const db = require('../../db/models');
const Op = require('../../db/db').Sequelize.Op;
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
    Product.findAll({ where: { [Op.or]: [
            { name: { [Op.iLike]: `%${srchVal}%` } },
            { description: { [Op.iLike]: `%${srchVal}%` } },
            { productNumber: { [Op.iLike]: `%${srchVal}%` } }
        ] }
        , order:[["name", "asc"]] })
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
    Category.findOne({ where: { id: req.params.catId } })
        .then(category => category.getProducts({ order: [["name", "asc"]] }))
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
    Category.findOne({ where: { id: req.params.catId } })
        .then(category => category.getProducts({ where: 
                { 
                    [Op.or] : [
                        { name: { [Op.iLike]: `%${srchVal}%` } },
                        { description: { [Op.iLike]: `%${srchVal}%` } },
                        { productNumber: { [Op.iLike]: `%${srchVal}%` } }
                    ]    
                }
            })
        )
        .then((products) => {
            if(pgIdx){
                const end = req.params.pgIdx * 10;
                const start = end - 10;
                res.send(products.slice(start, end));
            } else {
                res.send(products);
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
    // return Promise.all([ Product.create(req.body),
    //                      Category.findOne({where: {name: req.body.categoryName}}) ])
    // .then(([product, category]) => {
    //     product.update({categoryId: category.id});
    //     return product;
    // })
    req.body.stockStatus = req.body.quantity ? 'in stock' : 'out of stock'
    Product.create(req.body)
        .then((product) => res.json(product))
        .catch(next);
});

router.put('/:id', (req, res, next) => {
    Product.update(req.body, 
        {returning: true, where: {id: req.params.id}})
    .then(([ rowsUpdate, [updatedProduct] ]) => res.json(updatedProduct))
    .catch(next);
});

router.put('/category/:productId/:categoryId', (req, res, next) => {
    Product.findByPk(req.params.productId)
        .then(product => Promise.all([product.getCategories(), Category.findByPk(req.params.categoryId)])
            .then(([prevCats, newCat]) => product.setCategories([...prevCats, newCat]))
            .then(() => res.json())
        )
        .catch(next);
});

router.delete('/category/:productId/:categoryId', (req, res, next) => {
    Product.findByPk(req.params.productId)
        .then(product => product.removeCategory(req.params.categoryId)
            .then(() => product.getCategories())
            .then(categories => res.json(categories))
        )
        .catch(next);
});

module.exports = router;
