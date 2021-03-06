var express = require("express");
var router = express.Router();
var User = require("../models/User")
var passport = require("passport");
var middleware = require('../config');
var Ref = require('../models/referal');
var bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer");
const keys = require('../security/keys');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL || keys.admin.email,
        pass: process.env.PASSWORD  ||keys.admin.password
    }
  });
  
  var rand,mailOptions,host,link;

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



router.get("/users/logout", function(req, res) {
    req.logout(); 
    req.flash('success_msg', 'You are logged out');
    res.redirect("/");
 });


 /* router.get('/generate', (req,res) => {
  var generate = voucher_codes.generate({
    length: 6,
    count: 50000
  });
  Ref.create({name : generate, count : 0}, function(err, newlyCreatedIntership){
    if(err){console.log(err);}
    else{
      req.flash("success","Successfully posted a new internship");
      res.redirect("/internships");       
    }
 });
}) */

router.get('/send', middleware.checkEmailVarification , middleware.ensureAuthenticated, (req, res) => {
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="https://"+req.get('host')+"/verify?id="+rand;
    let mailOptions={
    from: keys.admin.from_email,
    to : req.user.email,
    subject : "Please confirm your Email account",
    html : "<h4 style='text-align:center'>Email Verification </h4> <br>Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    res.end("error");
    }else{
        console.log("Message sent: " + response.message);
        req.flash(
          'success_msg',
          'Mail Sent, verify email id'
        );
        res.redirect('/dashboard');
     }
    });
  })
  
  router.get('/verify', middleware.checkEmailVarification , function(req,res){
    console.log((req.protocol+"://"+req.get('host')))
    console.log("https://"+host)
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
      req.user.verified = true;
      Ref.findById(keys.admin.referal_code_id, (err, found) => {
        if(err)res.send("error ocurred");
        else{
          var codes = found.name;
          var count = found.count;
          User.findOneAndUpdate({email: req.user.email}, {$set:{verified:true, referal_code: codes[count]}}, (err, doc) => {
            if (err) {  
                req.flash(
                  'error_msg',
                  'Something went wrong, please re-verify your email'
                );
            }
        });
        Ref.findByIdAndUpdate(keys.admin.referal_code_id, {$set:{count:count+1}}, (err, doc) => {
          if(err){
            res.send('error occured');
          }
          else{
            req.flash('success_msg', 'Your email is verified');
          }
        })
        }
      })
      res.redirect("/");
      }
      else
      {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
      }
    }
    else
    {
      res.end("<h1>Request is from unknown source");
    }
  });


 module.exports = router;