const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

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
         type:Number,
         required:true
      }
   },
   phone:{
      type:Number,
      unique:true,
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
   },
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
   comments:[{
      type: Schema.Types.ObjectId,
      ref: 'Review'
   }],
   _creator:{
      type: Schema.Types.ObjectId,
      ref:'user',
      required: true
   }
   //comment
   //add rating
   //use mutler for images
});

ShopSchema.methods.toJSON = function (){
      var shop = this;
      var shopObject = shop.toObject();

      return _.pick(shopObject, ['_id','phone', 'type', 'description']);
};


var Shop = mongoose.model('Shop', ShopSchema);

module.exports = {Shop}
