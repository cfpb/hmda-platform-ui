#!/usr/bin/env node

var historyApiFallback = require('connect-history-api-fallback');
var http = require('http');
var mock = require('../api-mock/index.js')
var express = require('express');
var app = express();

app.use(express.static('dist'));

app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

app.use(function (req, res, next) {
  var url = req.url;
  console.log(url);
  if(req.url === '/submit'){
    return mock.handlePost(req, res);
  }else if(url.slice(0, 4) === '/api'){
    return mock.api(req, res);
  }
  next();
});

app.use(historyApiFallback());

http.createServer(app).listen(3000);
