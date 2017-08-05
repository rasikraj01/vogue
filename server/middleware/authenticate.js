var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');


  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    //modify the request
    req.user = user;
    req.token = token;
    console.log('authenticated');
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
