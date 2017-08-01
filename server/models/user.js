const mongoose = require('mongoose');
const validator = require('validator');

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
   //comment
});


var User = mongoose.model('User',
 UserSchema);

 module.exports = {User}
