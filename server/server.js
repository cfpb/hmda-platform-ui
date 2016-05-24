#!/usr/bin/env node

var path = require('path');
var express = require('express');
var historyApiFallback = require('express-history-api-fallback');
var apiRouter = require('./routes/api');

var app = express();

//Log paths
app.use(function(req, res, next){
  console.log(req.url);
  next();
})

//serve the app
app.use(express.static('dist'));

//serve the api, routes are nested in various modules
app.use('/api', apiRouter);

//serve the app even when a user refreshes from a client-side route defined by the history api
app.use(historyApiFallback(path.join('dist', 'index.html'), {root: '.'}));

app.listen(3000);
