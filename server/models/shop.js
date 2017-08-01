const mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
   address:{
      street:{
         type:String,
         required:true
      },
      city:{
         type:String,
         required:true,
      },
      zip:{
         type:Number
         required:true
      }
   },
   phone:{
      type:Number,
      unique:true
      required:true
   },
   description:{
      type:String,
      required:true
   },
   closed:{
      type:String,
      required:true
   },
   timeO:{
      type:Number,
      required:true
   },
   timeC:{
      type:Number,
      required:true
   }
   costL:{
      type:Number,
      required:true
   },
   costU:{
      type:Number,
      required:true
   },
   type:{
      type:String,
      required:true
   },
   //comment
   //add rating
   //use mutler for images
});

var Shop = mongoose.model('Shop', ShopSchema);

module.exports = {Shop}
