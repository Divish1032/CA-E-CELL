var express = require("express");
var router = express.Router();
var User = require("../models/User")
var passport = require("passport");


router.get('/', (req, res) => {
    res.render("landing");
})
router.get('/login', (req,res) => {
    res.render("login")
})
router.get('/:id/dashboard', (req, res) => {
    res.render("dashboard");
})

router.post("/login1", passport.authenticate("local",
    {
        successRedirect : "/",
        failureRedirect : "/login"
    }), function(req, res) {
    
});


  router.post('/login', function(req, res) {
    var newUser = new User({
        name: req.body.name,
        username: req.body.emailid,
        password: req.body.password,
        college: req.body.college,
        phone: req.body.phone
      });
  
      User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("error", err.message);   // Error occurs when the user is taken, password is empty etc.
            return res.redirect("/login");  // Shortcircut everything. Else the below code would run as well and that would throw an error
        }
        passport.authenticate("local")(req, res, function(){
            console.log(user.username); // 'user' is coming from database
            res.redirect("/");
        })
  });
});

router.get("/logout", function(req, res) {
    console.log(req.user);
    req.logout(); 
    res.redirect("/");
 });


 module.exports = router;