const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var ReviewSchema = new mongoose.Schema({
   Comment:{
      type:String
      maxlegth:250
   },
   like:{
      type:Number
   },
   dislike:{
      type:Number
   },
   date:{
      type:String
   },
   user:{
      type:Schema.types.ObjectId,
      ref:'User'
   }
   //shop
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = {Review}
