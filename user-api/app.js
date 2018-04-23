// Load Credentials and Connects to MongoDB/Mongoose
require('dotenv').load();
require('./config/db');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// DB logger
var mongomorgan = require('mongo-morgan');

// Authentication modules
var passport = require('passport');
var fs = require('fs');

// Route Connections
var userRouter = require('./routes/users');

var app = express();
app.use(logger('short'));
app.use(mongomorgan('mongodb://localhost:27017/cake', 'dev'));
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/users', userRouter);


module.exports = app;
