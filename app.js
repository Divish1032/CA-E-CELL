const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var app = express();

// Passport Config
/* auth(passport); */

app.use(express.static(__dirname + "/public"));
// DB Config
const db = process.env.MONGDB_URL || 'mongodb://ecell:qwerty007@ds215759.mlab.com:15759/ca-ecell';

// Connect to MongoDB
mongoose
  .connect(db);

  app.set('view engine', 'ejs');

  // Express body parser
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());

  // Connect flash
  app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


  var index = require("./routes/index")
 // var   user  = require("./routes/users");

// Routes
app.use('/', index);
/* app.use('/users', user); */



const PORT = process.env.PORT || 7000;

app.listen(PORT, function(){
    console.log("Server started");
});
