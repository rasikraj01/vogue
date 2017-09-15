const express = require('express');
const bodyParser = require('body-parser');

const {authorize} = require('./middleware/authorize');
const {authenticate} = require('./middleware/authenticate');
const {mongoose} = require('./db/mongoose');
const UserController=require('./controllers/user.controllers');
const ShopController=require('./controllers/shop.controllers');


const app = express();
const PORT = 5000;


app.use(bodyParser.json());
//HOME
app.get('/',(req, res) => {
   res.render('testing home');
});

//USER ROUTES
//create
app.post('/user', UserController.createUser );
//remove deactivate
app.delete('/user', authenticate, UserController.deleteUser);
//update
app.patch('/user', authenticate, UserController.updateUser);
//get
app.get('/user/me', authenticate ,UserController.getUser);
//login
app.post('/user/login', UserController.loginUser);
//logout
app.delete('/user/logout/token', authenticate, UserController.logoutUser);



//search shops ??
//locations ??


//SHOP ROUTES
//create
app.post('/shop', authenticate, authorize ,ShopController.createShop);
//remove
app.delete('/shop/:id',authenticate, authorize ,ShopController.deleteShop);
//update
app.patch('/shop/:id', authenticate , authorize ,ShopController.updateShop);
//fetch a single shop
app.get('/shop/:id', ShopController.getShop);
//fetch all shops
app.get('/shops/', ShopController.allShops);

app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
