#!/usr/bin/env node

var path = require('path');
var express = require('express');
var historyApiFallback = require('express-history-api-fallback');
var apiRouter = require('./routes/api');

var app = express();
var year = process.env.HMDA_YEAR || '2017';

//Log paths
app.use(function(req, res, next){
  console.log(req.url);
  next();
})

//serve the app

app.get('/', function(req, res){
  res.redirect(301, '2017');
});

app.use(express.static(path.join('dist', year)));

//serve the api, routes are nested in various modules
app.use('/api', apiRouter);

//serve the app even when a user refreshes from a client-side route defined by the history api
app.use(historyApiFallback(path.join('dist', year, 'index.html'), {root: '.'}));

app.listen(3000);
