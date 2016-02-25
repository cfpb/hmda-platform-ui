#!/usr/bin/env node

var nodemon = require('nodemon');

nodemon({
  ext: 'html',
  watch: '../src',
  exec: 'npm run dev:html'
}).on('log', function(log){
  console.log(log.colour);
});
