import './Login.css';
//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';

const myUser = '1234'


function Login(props) 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event)=>
  {
    event.preventDefault();

    if (email === "" && password === "") {
      alert("Please enter both an email and a password.");
      return;
    }
    if (email === "") {
      alert("Please enter an email.");
      return;
    }
    if (password === "") {
      alert("Please enter a password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8888/myuserlist?email=${email}');
      const userData = await response.json();

      const trueUser = userData.find(user => user.email === email);

      console.log(trueUser)

      if (!trueUser) {
        alert('User not found. Please check that you entered your email correctly.');
        return;
      }
      

      if (trueUser.pwd === password) {
        let userName = ""
        if (trueUser.name !== undefined) {
          userName = trueUser.name;
        }
        else
          userName = trueUser.email

        window.sessionStorage.setItem('myUser', email);
        window.sessionStorage.setItem('userName', userName)
        console.log("Hello there: " + window.sessionStorage.getItem("myUser"));

        window.location.href = '/Home';
      }
      else {
        alert("Incorrect password. Please try again.");
      }
      
      }
      catch (error) {
        console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
    }
  }

    

  
  
    return (
    <div>
      <div className="title-block">
        <div className="welcome">
          welcome to the
        </div>
        StudyNest!
      </div>
    <div className="login-wrapper">
      <h1 className="login-msg">Please Log In</h1>
        <form action='/Home' onSubmit={handleLogin}>
          <label className="text">
            <div>Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label className="text">
            <div>Password</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <div>
            <button className="login-button" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="sign-up">Not a member? <a className="sign-up" href="/SignUp">Sign Up</a></div>
      </div>
    </div>
  );
}

/*
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefualt();
      const res = fetch('http://localhost:3000/');
    }
async function loginUser(email, password) {
  // check email and password with database
  // 0 = success, 1 = wrong password, 2 = email not found
  const url = "http://localhost:5000/login";
  let res = await fetch(url);
  res = res.text();
  console.log(res);
  return res;
}

*/

export default Login;
