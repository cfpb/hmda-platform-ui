#!/usr/bin/env node

var nodemon = require('nodemon');

nodemon({
  ext: 'scss',
  watch: '../src/scss',
  exec: 'npm run dev:sass'
}).on('log', function(log){
  console.log(log.colour);
});
