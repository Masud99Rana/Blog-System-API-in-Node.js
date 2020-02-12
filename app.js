const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

// Load Route file
const feedRoutes = require('./routes/feed');

// Config Storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

//Multer setup
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

// CORS solved
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');// 'codepen.id' or, 'codepen.id, w3.io'
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); // must declare this before using any route

// Route setup
app.use('/feed', feedRoutes); 

// Error hanlder middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose
  .connect(
    'mongodb+srv://masud:WUBSlPXs7qAmT3ao@cluster0-hdjzg.mongodb.net/test?retryWrites=true&w=majority'
    )
  .then(result => {
    app.listen(4545);
    console.log('Hey, I am here');
  })
  .catch(err => console.log(err));