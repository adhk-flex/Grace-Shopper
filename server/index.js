const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const pluralize = require('pluralize');
const { dbSync } = require('../db');

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

let routearray = ['product', 'category', 'cart', 
                    'lineitem', 'order', 'address', 
                    'creditcard'];
routearray.forEach(item => {
    app.use(`/api/${pluralize(item)}`, require(`./routes/${item}`));
});

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '../index.html')));
app.get('/style.css', (req, res, next)=> res.sendFile(path.join(__dirname, 'style.css')));

// Handle 404s
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    let errors = [error];
    if (error.errors) {
      error = error.errors.map(_error => {
        return _error.message;
      });
    } else if (error.original) {
      errors = [error.original.message];
    }
    res.status(error.status || 500).send({ errors });
  });

dbSync()
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => {
        throw new Error(e.message);
    });
