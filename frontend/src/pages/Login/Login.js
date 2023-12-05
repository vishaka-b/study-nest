import './Login.css';
import React, { useState } from 'react';

function Login() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event)=>
  {
    event.preventDefault();

    if (email === "" && password === "") {
      alert("Please enter both an email and a password");
      return;
    }
    if (email === "") {
      alert("Please enter an email");
      return;
    }
    if (password === "") {
      alert("Please enter a password");
      return;
    }

    try {
      const response = await fetch('http://localhost:8888/myuserlist?email=${email}');
      const userData = await response.json();

      const trueUser = userData.find(user => user.email === email);

      console.log(trueUser)

      if (!trueUser) {
        alert('User not found; please check that you entered your email correctly');
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
        alert("Incorrect password; please try again");
      }
      
      }
      catch (error) {
        console.error('Error during login:', error);
    alert('An error occurred during login; please try again');
    }
  }
  
    
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
                 <span className="small-text"> Show password</span>
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
}

export default Login;
