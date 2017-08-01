const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const UserController=require('./controllers/user.controllers')


const app = express();
const PORT = 5000;


app.use(bodyParser.json());

//USER ROUTES
app.get('/',(req, res) => {
   res.send('hello world');
});
app.post('/user', UserController.createUser );



app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
