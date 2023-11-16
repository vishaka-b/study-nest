import './Login.css';
import logo from './logo.png'
import React, { useState } from 'react';

export default function LoginScreen() {
  // State to store the email input value
  const [username, setName] = useState('');

  // Function to handle changes in the email input
  const handleUsernameChange = (u) => {
    setName(u.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (u) => {
    u.preventDefault();
    // You can add your login logic here, e.g., sending the email to a server
    console.log('Username submitted:', username);


  };

  return (
    <body>
    <h1 className="title">StudyNest</h1>
    <div className="home-logo">
      <img src={logo} alt="logo" className="home-logo-img"/>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          className="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <button className="login-button" type="submit">Sign In</button>

      </form>
    </div>
    </body>
  );
}


