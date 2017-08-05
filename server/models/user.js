const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
   // username:{
   //    type:String,
   //    required:true,
   //    unique:true
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

UserSchema.statics.findByToken = function (token){
   var User = this;
   var decode;

   try {
      decode = jwt.verify(token, 'thisissecert');
      console.log(decode);
   } catch (e) {
      return Promise.reject();
   }

   return User.findOne({
      '_id': decode._id,
      'tokens.token': token,
      'tokens.access': 'auth'
   });
};
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(11, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User',
 UserSchema);

 module.exports = {User}
