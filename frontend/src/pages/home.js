import NavBar from '../Navbar';
import React from 'react';
export default function Home(){
    return (
    <div className='homepage'>
        <NavBar />
        <h1>StudyNest</h1>
        <div className="groups-in">
            <h2 className="homeBody">Groups you're in:</h2>
        
        </div>
        <div className="groups-made"> 
            
            <h2 className="homeBody">Groups you've made:</h2>
            <div>
                <button type="button" className="createNewGroup"> + </button>
            </div>
            
            </div>
       
        
        </div>)
}