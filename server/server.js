const express = require('express');
const {mongoose} = require('./db/mongoose');
const _ = require('lodash');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

var {User} = require('./models/user');

app.use(bodyParser.json());

app.get('/',(req, res) => {
   res.send('hello world');
});
app.post('/user', (req, res) => {
   var body = _.pick(req.body, ['email', 'password', 'type']);
   var user = new User(body);

   user.save()
      .then((doc) => {res.send(doc);});
});



app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
