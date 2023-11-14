import Axios from "axios";
import React, { useEffect, useState } from 'react';

export default function Home(){

    const [groupsYoureIn, setGroupsYoureIn] = useState("");

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:5000/getGroupsYoureIn");
        setGroupsYoureIn(response.data);
    }

    useEffect(()=> {
        getGroupsYoureIn()
    }, []); 

    return (<>
    
        <h1>StudyNest</h1>
        <div>
            <h2 className="homeBody">Groups you're in:</h2>
            <h3> {groupsYoureIn} </h3>
        
        </div>
        <div> 
            
            <h2 className="homeBody">Groups you've made:</h2>
            <button type="button" className="createNewGroup"> + </button>

            
            </div>
       
        
        </>)
}