const {User} = require('./../models/user');
const _ = require('lodash');

module.exports = {
   createUser(req, res) {
      var body = _.pick(req.body, ['email', 'password', 'type']);
      var user = new User(body);

      user.save()
         .then((doc) => {res.send(doc);});
   }
}
