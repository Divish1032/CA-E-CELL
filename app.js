var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models/User");
var methodOverride = require("method-override");

var app = express();
var indexRoutes = require("./routes/index");
/* Set the Public folder to server*/
app.use(express.static(__dirname + "/public"));

/* Set method override*/
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

/*View Engine*/
app.set("view engine","ejs");


mongoose.connect('mongodb://ecell:qwerty007@ds215759.mlab.com:15759/ca-ecell');




// Passport configuration
app.use(require("express-session")({
    secret : "Something secret",
    resave : false,
    saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());
// The methods are available in the passport-local-mongoose library
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Define your own middleware which would run for all the routes*/
/* In this case, the currentuser would be present for every route */
/* Use it after the session configuration */
app.use(function(req, res , next){
    res.locals.currentUser = req.user;   // user = {username : xxxx,  _id : xxxx} // User would be available for all routes
  // Both of these variables would be empty most of the times
    next();
 });



 app.use("/",indexRoutes);



const PORT = process.env.PORT || 7000;

app.listen(PORT, function(){
    console.log("Server started");
});
