const {Shop} = require('./../models/shop');
const _ = require('lodash');

module.exports = {
   createShop(req, res){
      var body = _.pick(req.body,['address.street','address.city', 'address.zip','phone', 'description', 'closed', 'timeO', 'timeC', 'costL', 'costU', 'type']);
      body['_creator'] = req.user._id;
      console.log(body);

      var shop = new Shop(body);

      shop.save()
         .then((doc) => {res.send(doc)});

   },
   deleteShop(req, res){
      var id = req.params.id;
      Shop.findOneAndRemove({
         _id:id,
         _creator:req.user._id
      }).then(() => {res.send('deleted shop')});
   },
   getShop(req, res){
      var id = req.params.id;

      Shop.findById({
         _id: id
      }).then((doc) => {
         if(!doc){
            return res.status(404).send();
         }
         res.send({doc});
      }).catch((e) => {
         res.status(400).send();
      });
   },
   updateShop(req, res){
      var id = req.params.id;
      var body = _.pick(req.body, ['address.street','address.city', 'address.zip','phone', 'description', 'closed', 'timeO', 'timeC', 'costL', 'costU', 'type']);

      Shop.findOneAndUpdate({
         _id:id,
         _creator:req.user._id
      },{$set:body},{new:true})
      .then((doc) => {res.send({doc});})
      .catch((e) => {
         res.status(400).send()
      });
   },
   allShops(req, res){
      Shop.find()
      .then((doc) => {res.send(doc)})
      .catch(((e) => {
         console.log('controller eerror');
         res.status(404).send();
      }));
   }
}
//  ['address', 'phone', 'description', ]
