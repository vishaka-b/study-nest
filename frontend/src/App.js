//import logo from './logo.svg';
import './App.css';
import AllGroups from './pages/allgroups';
import Login from './pages/Login/Login';
import Home from './pages/home';
import SignUp from './pages/SignUp/SignUp';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
//import React, {useState} from 'react';


 
function App() {
  
    return (
    <div className="wrapper">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
        <Route path="/allgroups" element={<AllGroups/>}>
        </Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
   </div>   

  );
  
  }

  /*// Custom hook. Essentially, when you submit login info, this will change its state, 
// causing a re-render.
function UserState() {
  const getUserInfo = () => {
    const user = sessionStorage.getItem('user');
    return [user];
  };
  
  // newInfo[0] = username
  const saveUserInfo = newInfo => {
    sessionStorage.setItem('user', newInfo[0]);
    setUserInfo(newInfo);
  };

  const [userInfo, setUserInfo] = useState(getUserInfo());

  return [userInfo, saveUserInfo];
} */

export default App;
