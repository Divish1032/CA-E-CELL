var express = require("express");
var router = express.Router();
var User = require("../models/User")
var passport = require("passport");
var middleware = require('../config');

router.get('/', (req, res) => {
    res.render("landing",{ user : req.user });
})


router.get('/dashboard', middleware.ensureAuthenticated, (req, res) => {
    if(req.user.verified== false){
        req.flash('error_msg', 'Please verify the email id');
    }
    res.render('dashboard', {
        user: req.user
    })
    }
);

  // Login Page
router.get('/users/login', middleware.forwardAuthenticated, (req, res) =>{
    res.render('login');
  } );
  
  
  // Register Page
  router.get('/users/register', middleware.forwardAuthenticated, (req, res) => res.render('register'));




// Register
router.post('/users/register', (req, res) => {
    const { name, email, password, password2, phone, college } = req.body;
    let errors = [];
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', { errors, name, email, password, password2, phone, college });
    } 
    else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', { errors, name, email, password, password2 });
        } 
        else {
          var newUser = new User({ name, email, password, phone, college });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(user => {
                  req.flash('success_msg','You are now registered and can log in');
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

// Login
router.post('/users/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });



router.get("/logout", function(req, res) {
    req.logout(); 
    req.flash('success_msg', 'You are logged out');
    res.redirect("/");
 });


 module.exports = router;