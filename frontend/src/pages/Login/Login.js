import './Login.css';
//import logo from './logo.png'
import React, { useState } from 'react';

export default function Login({check}) {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    check = false;
    function handleSubmit(){
      check = true;
    }
    return (
    <body>
      <div className="title-block">
        <div className="welcome">
          welcome to the
        </div>
        StudyNest!
      </div>
    <div className="login-wrapper"/>
    <h1 className="login-msg">Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email"></input>
        </label>
        <label>
          <p>Password</p>
          <input type="password"></input>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </body>
  );
}
/*
<div className="home-logo">
      <img src={logo} alt="logo" className="home-logo-img"/>
    </div> */