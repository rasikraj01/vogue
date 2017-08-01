const mongoose = require('mongoose');

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
   }
   //shop
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = {Review}
