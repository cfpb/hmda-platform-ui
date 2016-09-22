#!/usr/bin/env node

var path = require('path');
var express = require('express');
var historyApiFallback = require('express-history-api-fallback');
var apiRouter = require('./routes/api');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Log paths
app.use(function(req, res, next){
  //Rewrite url if arriving via nginx
  if(req.get('X-Forwarded-For')){
    req.url = '/api' + req.url
  }
  console.log(req.method + ' - ' + req.url);
  next();
});

//serve the app
app.use(express.static('dist'));

//serve the api, routes are nested in various modules
app.use('/api', apiRouter)

//serve the app even when a user refreshes from a client-side route defined by the history api
app.use(historyApiFallback(path.join('dist', 'index.html'), {root: '.'}));

app.listen(8080);
