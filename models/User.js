var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  college: {
     type: String,
     required: true
  },
  phone: {
     type: String,
     required: true 
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified:{
    type: Boolean,
    default: false
  },
  referal_code: {
    type : String,
    default : null
  }
});

  UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);