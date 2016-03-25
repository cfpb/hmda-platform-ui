#!/usr/bin/env node

var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var mock = require('../api-mock/index.js')

browserSync.init({
  open: false,
  server: {
    baseDir: './dist',
    middleware: [function (req, res, next) {
      var url = req.url;
      console.log(url);
      if(req.url === '/submit'){
        return mock.handlePost(req, res);
      }else if(url.slice(0, 4) === '/api'){
        return mock.api(req, res);
      }
      next();
    },
    historyApiFallback()
    ]
  }
});
