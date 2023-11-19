import './Login.css';
//import React, { useState } from 'react';

function Login(props) {
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
        <form action='/'>
          <label className="text">
            <div>Email</div>
            <input type="email"  />
          </label>
          <label className="text">
            <div>Password</div>
            <input type="password" />
          </label>
          <div>
            <button className="login-button" type="submit">
              Submit
            </button>
          </div>
        </form>
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