import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Widget from '../features/widget.js'

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
        
            <Widget name={"Code Crackin' Chicks"} course={"COM SCI 35L"} time={"Mon 5:00-7:00pm"}></Widget>
        </div>
        <div> 
            
            <h2 className="homeBody">Groups you've made:</h2>
            <button type="button" className="createNewGroup"> + </button>

            
            </div>
       
        
        </>)
}