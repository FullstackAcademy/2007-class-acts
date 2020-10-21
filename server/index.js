const express = require('express');
const path = require('path');

const app = express();

// INSERT APP.USE STUFF HERE
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './public')))


app.use('/api', require('./api'))

//This sends the HTML file for all default requests.
//We'll have to set up some front-end error handling
//if people request a url we aren't expecting
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// INSERT ERROR HANDLING HERE
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal Server Error')
})


module.exports = app;
