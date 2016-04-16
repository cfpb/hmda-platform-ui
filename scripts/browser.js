#!/usr/bin/env node

var historyApiFallback = require('connect-history-api-fallback');
var http = require('http');
var mock = require('../api-mock/index.js')
var connect = require('connect');
var serveStatic = require('serve-static')

var app = connect();

app.use(serveStatic('dist'));

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
