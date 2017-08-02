const {Shop} = require('./../models/shop');
const _ = require('lodash');

module.exports = {
   createShop(req, res){
      var body = _.pick(req.body,['address.street','address.city', 'address.zip','phone', 'description', 'closed', 'timeO', 'timeC', 'costL', 'costU', 'type']);
      var shop = new Shop(body);

      shop.save()
         .then((doc) => {res.send(doc)});
   },
   deleteShop(req, res){
      var id = req.params.id;
      Shop.findOneAndRemove({
         _id:id
      }).then(() => {res.send('deleted')});
   },
   getShop(req, res){
      var id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(404).send();
      }

      Shop.findOne({
         _id: id
      }).then((doc) => {
         if(!doc){
            return res.status(404).send();
         }
         res.send({doc});
      }).catch((e) => {
         res.status(400).send();
      });
   }
   // updateShop(req, res){
   //    var id = req.params.id;
   //    var body = _.pick(req.body);
   //
   //    Shop.findOneAndUpdate()
   // }
}
//  ['address', 'phone', 'description', ]
