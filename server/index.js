const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const { dbSync } = require("../db");

const port = process.env.PORT || 3000;
app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, '../dist', 'main.js')));

// Logging middleware
app.use(morgan('dev'));

app.use(express.json());

// Static middleware
app.use(express.static(path.resolve(__dirname, '../dist')));

// Session middleware
app.use(session({
    secret: 'This is not a very secure secret...',
    resave: false,
    saveUninitialized: false
  }));

// authentication router
app.use('/auth', require('./routes/user'));

app.use('/api/products', require('./routes/product'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/carts', require('./routes/cart'));
app.use('/api/lineitems', require('./routes/lineitem'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/address', require('./routes/address'));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));
app.get('/style.css', (req, res, next)=> res.sendFile(path.join(__dirname, 'style.css')));

// Handle 404s
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err, err.stack);
    res.status(500).send(err);
});

dbSync()
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => {
        throw new Error(e.message);
    });
