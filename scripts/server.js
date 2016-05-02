#!/usr/bin/env node

var express = require('express');
var historyApiFallback = require('connect-history-api-fallback');
var apiRouter = require('./routes/api');

var app = express();
//serve the app
app.use(express.static('dist'));

//serve the api, routes are nested in various modules
app.use('/api', apiRouter);

//serve the app even when a user refreshes from a client-side route defined by the history api
app.use(historyApiFallback());

app.listen(3000);
