const express = require('express');
const app = express();
const path = require('path');
const { dbSyncAndSeed } = require("../db");
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const port = process.env.PORT || 3000;
app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, '../dist', 'main.js')));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));
app.get('/style.css', (req, res, next)=> res.sendFile(path.join(__dirname, 'style.css')));


app.use((err, req, res, next) => {
    console.error(err, err.stack);
    res.status(500).send(err);
});

dbSyncAndSeed()
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => {
        throw new Error(e.message);
    });
