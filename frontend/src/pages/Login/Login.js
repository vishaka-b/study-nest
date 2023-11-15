import './Login.css';
//import logo from './logo.png'
import React, { useState } from 'react';

export default function Login({setToken}) {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    function handleSubmit(){
    
    }
    return (
    <body>
      <div className="title-block">
        <div className="welcome">
          welcome to the
        </div>
        StudyNest!
      </div>
    <div className="login-wrapper">
      <h1 className="login-msg">Please Log In</h1>
        <form action="/">
          <label className="text">
            <div>Email</div>
            <input type="email"></input>
          </label>
          <label className="text">
            <div>Password</div>
            <input type="password"></input>
          </label>
          <div>
            <button className="login-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </body>
  );
}
/*
<div className="home-logo">
      <img src={logo} alt="logo" className="home-logo-img"/>
    </div> */