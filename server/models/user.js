const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
   email:{
      type:String,
      require:true,
      minlength:3,
      unique:true,
      trim:true,
      validate:{
         validator: validator.isEmail,
         message:'Please enter a valid email'
      }
   },
   password:{
      type:String,
      minlegth:8,
      require:true
   },
   // name:{
   //    type:String,
   //    required:true
   // },
   type:{
      required:true,
      type:String
   },
   tokens:[{
      access:{
         type:String
      },
      token:{
         type:String
      }
    }]
   // comment:{
   //    type:Schema.Types.ObjectID,
   //    ref: 'Review'
   // }
   //comment
});


//over riding toJSON so that is doesnt return the token values
UserSchema.methods.toJSON = function () {
   var user = this;
   var userObject = user.toObject();

   return _.pick(userObject, ['_id', 'email']);
}

//works on every user documents
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'thisissecert').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};


var User = mongoose.model('User',
 UserSchema);

 module.exports = {User}
