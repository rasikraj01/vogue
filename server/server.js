const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const UserController=require('./controllers/user.controllers');
const ShopController=require('./controllers/shop.controllers');


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
//HOME
app.get('/',(req, res) => {
   res.send('testing home');
});

//USER ROUTES
//create
app.post('/user', UserController.createUser );
//remove
app.delete('/user/:id', UserController.deleteUser);
//update
app.patch('/user/:id', UserController.updateUser);
//get
app.get('/user/:id', UserController.getUser);

//search routes ??
//authentication
//authorization

//SHOP ROUTES
//create
app.post('/shop', ShopController.createShop);
//remove
app.delete('/shop/:id', ShopController.deleteShop);
//update
app.patch('/shop/:id', ShopController.updateShop);
//delete
app.get('/shop/:id', ShopController.getShop);

app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
