const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');// 'codepen.id' or, 'codepen.id, w3.io'
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); // must declare this before using any route

app.use('/feed', feedRoutes); 

app.listen(8000);
console.log('Hey, I am here');