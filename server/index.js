const express = require('express');
const path = require('path');

const app = express();

// INSERT APP.USE STUFF HERE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './public')))


app.use('/api', require('./api'))
// INSERT ERROR HANDLING HERE



module.exports = app;
