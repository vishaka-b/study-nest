import logo from './logo.svg';
import './App.css';
import NavBar from './Navbar';
import AllGroups from './pages/allgroups';
import Login from './pages/login';
import Home from './pages/home';

function App() {
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
  return (
    <>
     <div className='App'>
    <NavBar />
    <div className='container'>{currentPage}</div>
    
    
    </div>
    
    
   
    
    </>
    
     
  );
  
  }
export default App;
