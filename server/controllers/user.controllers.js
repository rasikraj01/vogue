const {User} = require('./../models/user');
const _ = require('lodash');

module.exports = {
   createUser(req, res) {
      var body = _.pick(req.body, ['email', 'password', 'type']);
      var user = new User(body);

      user.save()
         .then(() => {
            return user.generateAuthToken();
            //res.send(doc);
         }).then((token) => {
            res.header('x-auth', token).send(user);
         });
   },
   deleteUser(req, res) {
      var id = req.params.id;

      User.findOneAndRemove({
         _id:id
      }).then(() => {res.send('deleted user');})
         .catch((e) => {res.status(400).send()});

   },
   getUser(req, res) {
      res.send(req.user);
      // User.findOne({
      //    _id:id
      // }).then((doc) => {res.send(doc)})
      //    .catch((e) => {res.status(400).send();});
   },
   updateUser(req, res) {
      var id = req.params.id;
      var body = _.pick(req.body , ['email', 'password'])
      User.findOneAndUpdate({
         _id:id
      }, {$set: body}, {new: true})
      .then((doc) => {res.send(doc)})
      .catch((e) => {res.status(400).send()});
   },
   loginUser(req, res) {
      var body = _.pick(req.body, ['email', 'password']);

      User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
          res.header('x-auth', token).send(user);
        });
      }).catch((e) => {
        res.status(400).send();
      });
   }
}
