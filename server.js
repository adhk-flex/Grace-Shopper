const express = require('express');
const app = express();
const path = require('path');

const { dbSyncAndSeed } = require("./db");

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

dbSyncAndSeed()
    .then(() => app.listen(port, ()=> console.log(`listening on port ${port}`)))
    .catch(e => {
        throw new Error(e.message);
    });
