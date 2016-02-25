#!/usr/bin/env node

var nodemon = require('nodemon');

nodemon({
  ext: 'js,jsx',
  watch: '../src/js',
  exec: 'npm run dev:js & npm test'
}).on('log', function(log){
  console.log(log.colour);
});
