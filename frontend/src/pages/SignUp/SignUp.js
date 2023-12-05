import './SignUp.css';
import React, { useState } from 'react';

function SignUp(props) {


  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [reTypepwd, setReTypePwd] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleUserSubmit= async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8888/myuserlist?email=${email}&name=${name}`);
    const userData = await response.json();
    const userExists = userData.find(user => user.email === email);
  if(name === "" || email === "" || pwd === "" || reTypepwd === "")  {
    alert("Please fill out all fields to sign up")
  }
  else if (userExists) {
    alert('Email already exists; please choose a different one');
  } 
  else if (reTypepwd !== pwd){
    alert('Passwords must match')
  }
  else {
    fetch('http://localhost:8888/createNewUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                pwd: pwd,
                name: name
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
          Welcome to
        </div>
        Study Nest!
      </div>
    <div className="login-wrapper">
      <h1 className="login-msg">Sign up</h1>
        <form action='/' onSubmit={handleUserSubmit} >
        <label className="text">
            <div>Name</div>
            <input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <label className="text">
            <div>Email</div>
            <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label className="text">
            <div>Password</div>
            <input type={showPassword ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            <br></br>
            <span className="show-password-checkbox">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                 <span className="small-text"> Show password</span>
              </span>
          
          </label>

          <label className="text">
            <div>Re-enter password</div>
            <input type={showPassword2 ? "text" : "password"}  value={reTypepwd} onChange={(e) => setReTypePwd(e.target.value)}/>
            <br></br>
            <span className="show-password-checkbox">
                <input
                  type="checkbox"
                  checked={showPassword2}
                  onChange={() => setShowPassword2(!showPassword2)}
                />
                 <span className="small-text"> Show password</span>
              </span>
          
          
          </label>
          <div>
            <button className="login-button" type="submit" >
              Sign up
            </button>
          </div>
        </form>
        <div className="login-link">Already a member? <a className="login-link" href="/">Log in</a></div>
      </div>
    </div>
  );
}

export default SignUp;