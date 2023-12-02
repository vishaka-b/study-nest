import './Login.css';
//import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';

const myUser = '1234'
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 7.33 2 12s4.48 10 10 10 10-4.33 10-10S17.52 2 12 2zm-1 6s2-3 5-3c1.99 0 4 1 4 3s-2 3-4 3c-1.99 0-5-1-5-3zm1 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
  </svg>
);

function Login(props) 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  /*return (
    <div>
      <div className="title-block">
        <div className="welcome">
          Welcome to
        </div>
        Study Nest!
      </div>
      <div className="login-wrapper">
        <h1 className="login-msg">Please log in</h1>
        <form action='/Home' onSubmit={handleLogin}>
          <label className="text">
            <div>Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="text">
            <div>Password</div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
            
              <EyeIcon />
            </span>
          </label>
          <div>
            <button className="login-button" type="submit">
              Log in
            </button>
          </div>
        </form>
        <div className="sign-up">Not a member? <a className="sign-up" href="/SignUp">Sign up</a></div>
      </div>
    </div>
  );*/
    
  return (
    <div>
      <div className="title-block">
        <div className="welcome">
          Welcome to
        </div>
        Study Nest!
      </div>
      <div className="login-wrapper">
        <h1 className="login-msg">Please log in</h1>
        <form action='/Home' onSubmit={handleLogin}>
          <label className="text">
            <div>Email</div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="text">
            <div>Password</div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <span className="show-password-checkbox">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                 <span className="small-text"> Show Password</span>
              </span>
            </div>
          </label>
          <div>
            <button className="login-button" type="submit">
              Log in
            </button>
          </div>
        </form>
        <div className="sign-up">Not a member? <a className="sign-up" href="/SignUp">Sign up</a></div>
      </div>
    </div>
  );

  
  
   /* return (
    <div>
      <div className="title-block">
        <div className="welcome">
          Welcome to
        </div>
        Study Nest!
      </div>
    <div className="login-wrapper">
      <h1 className="login-msg">Please log in</h1>
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
              Log in
            </button>
          </div>
        </form>
        <div className="sign-up">Not a member? <a className="sign-up" href="/SignUp">Sign up</a></div>
      </div>
    </div>
  );*/
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
