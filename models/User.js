var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    phone: { type: String, required: true }
  });

  userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);