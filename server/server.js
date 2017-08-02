const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const UserController=require('./controllers/user.controllers');
const ShopController=require('./controllers/shop.controllers');


const app = express();
const PORT = 5000;


app.use(bodyParser.json());

//USER ROUTES
app.get('/',(req, res) => {
   res.send('testing');
});
app.post('/user', UserController.createUser );

//SHOP ROUTES
//create
app.post('/shop', ShopController.createShop);
//remove
app.delete('/shop/:id', ShopController.deleteShop);
//update
//app.patch('/shop/:id', ShopController.updateShop);
//delete
app.get('shops/:id', ShopController.getShop);

app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
