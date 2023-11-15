//import logo from './logo.svg';
import './App.css';
import NavBar from './Navbar';
import AllGroups from './pages/allgroups';
import Login from './pages/Login/Login';
import Home from './pages/home';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React, {useState} from 'react';


function App() {
  const [token, setToken] = useState();
  let startPage = "/login"
  //if (!token){
  //  return (<Login setToken={setToken}/>);
  //}
  return (
    <div className="wrapper">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="/allgroups" element={<AllGroups/>}>
        </Route>
      </Routes>
    </BrowserRouter>
   </div>   
  );
  
  }
export default App;
/*
  return (
   <div className="wrapper">
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}>
        </Route>
        <Route path="/allgroups" element={<AllGroups/>}>
        </Route>
      </Routes>
    </BrowserRouter>
   </div>   
     
  );
  
  }
export default App;

/*
<>
let currentPage
  switch (window.location.pathname){
    case "/":
      currentPage = <Home />
      break
    case "/allgroups":
      currentPage = <AllGroups />
      break
    case "/login":
      currentPage = <Login />
      break

  }
     <div className='App'>
    <NavBar />
    <div className='container'>{currentPage}</div>
    
    
    </div>
    
    
   
    
    </>
*/
/*
<BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}>
        </Route>
        <Route path="/allgroups" element={<AllGroups/>}>
        </Route>
      </Routes>
    </BrowserRouter>
*/