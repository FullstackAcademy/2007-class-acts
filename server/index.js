const express = require('express');
const path = require('path');

const app = express();

// INSERT APP.USE STUFF HERE
app.use(express.static(path.join(__dirname, './public')))
// INSERT ERROR HANDLING HERE

module.exports = app;
