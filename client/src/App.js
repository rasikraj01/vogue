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
      </div>
    );
  }
}

export default App;
