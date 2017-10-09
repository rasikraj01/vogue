import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  handleSubmit(e) {
      e.preventDefault();
      var  url = 'http://localhost:5000/user'
      var body = {email: this.refs.email.value,password: this.refs.password.value, type: this.refs.type.value}
      console.log(body);
      const res = axios.post(url, body).then((body) => {console.log(body);}).catch((e) => {console.log(e);});
      console.log(res);
  }
  handleClick(e) {
     e.preventDefault();
     var  url = 'http://localhost:5000/shops'
      axios.get(url).then((shops) => {console.log(shops.data);});
  }
  handleClickUser(e){
     e.preventDefault();
     var url='http://localhost:5000/user/me';
     axios.get(url).then((body) => {console.log(body)});
 }
 handleSubmitLogin(e){
    e.preventDefault();
    var body = {email:this.refs.email_login.value, password:this.refs.password_login.value}
    console.log(body)
    var url='http://localhost:5000/user/login'
    axios.post(url, body).then((body) => {console.log(body); console.log('logged in');}).catch((e) => {console.log(e)});
}
handleShop(e){
   var body ={
	"address":{
      "street":
         "1",
      "city":"delhimum"
      ,
      "zip":"000999"
   },
   "phone":"1221280",
   "description":"good shop",
   "closed":"Sunday",
   "timeO":"0800",
   "timeC":"1800",
   "costL":"111",
   "costU":"2222",
   "type":"kids fashion"
}
var url='http://localhost:5000/shop/'
axios.post(url, body).then(body => {console.log(body);}).catch((e) => {console.log(e);})
}
  render() {
    return (
      <div className="App">
         <p>create user</p>
        <form action="http://localhost:5000/user" method="POST" onSubmit={this.handleSubmit.bind(this)}>
           <input type="text" ref="email" placeholder="email"/>
           <input type="password" ref="password" placeholder="password"/>
           <input type="text" ref="type" placeholder="type"/>
           <button type="submit">submit</button>
        </form>
          <p onClick={this.handleClick}>shop</p>
          <p onClick={this.handleClickUser}>User</p>
          <p>login user</p>
         <form action="http://localhost:5000/user/login" method="POST" onSubmit={this.handleSubmitLogin.bind(this)}>
            <input type="text" ref="email_login" placeholder="email"/>
            <input type="password" ref="password_login" placeholder="password"/>
            <button type="submit">submit</button>
         </form>
      <p onClick={this.handleShop}>make a shop</p>
      </div>
    );
  }
}

export default App;
