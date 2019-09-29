var express = require("express");
var router = express.Router();
var User = require("../models/User")
var passport = require("passport");
var middleware = require('../config');

router.get('/', (req, res) => {
    res.render("landing",{ user : req.user });
})


/* router.get('/dashboard', middleware.ensureAuthenticated, (req, res) => {
    if(req.user.verified== false){
      req.flash('error_msg', 'Please verify the email id');
    }
    res.render('dashboard', {
      user: req.user
    })
  }
  ); */



  // Login Page
router.get('/users/login', middleware.forwardAuthenticated, (req, res) =>{
    res.render('login');
  } );
  
  
  // Register Page
  router.get('/users/register', middleware.forwardAuthenticated, (req, res) => res.render('register'));




router.get("/logout", function(req, res) {
    console.log(req.user);
    req.logout(); 
    res.redirect("/");
 });


 module.exports = router;