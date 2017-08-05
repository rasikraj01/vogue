const {User} = require('./../models/user');

var authorize = (req, res, next) => {
   var type = req.user.type;
   if (type=="shop"){
      next();
   }else {
      console.log('authorization error');
      res.status(401).send();
   }
}

module.exports = {authorize};
