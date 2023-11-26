import './SignUp.css';
import React, { useState } from 'react';

function SignUp(props) {


  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleUserSubmit= async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8888/myuserlist?email=${email}`);
  const userData = await response.json();
  const userExists = userData.find(user => user.email === email);

  if (userExists) {
    alert('Username already exists. Please choose a different one.');
  } else {
    fetch('http://localhost:8888/createNewUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
               
                pwd: pwd,
            }),
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        })
        .finally(() => {
        });
  }

  };
    return (
    <div>
      <div className="title-block">
        <div className="welcome">
          welcome to the
        </div>
        StudyNest!
      </div>
    <div className="login-wrapper">
      <h1 className="login-msg">Sign Up</h1>
        <form action='/' onSubmit={handleUserSubmit} >
          <label className="text">
            <div>Email</div>
            <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label className="text">
            <div>Password</div>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
          </label>
          <div>
            <button className="login-button" type="submit" >
              Sign Up
            </button>
          </div>
        </form>
        <div className="login-link">Already a member? <a className="login-link" href="/">Log In</a></div>
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

export default SignUp;