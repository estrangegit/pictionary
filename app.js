const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('views', path.join(__dirname, 'public/ejs/'));

app.use(morgan('tiny'));

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/pictionary', routes);

app.use('*', function(req, res){
    res.send('Error 404: not found');
})

module.exports = app;