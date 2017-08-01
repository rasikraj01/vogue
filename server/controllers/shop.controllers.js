const {Shop} = require('./../models/shop');
const _ = require('lodash');

module.exports = {
   createShop(req, res){
      var body = _.pick(req.body);
      var shop = new Shop(body);

      shop.save()
         .then((doc) => {res.send(doc)});
   }
}
//  ['address', 'phone', 'description', ]
