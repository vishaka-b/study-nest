import NavBar from '../Navbar';
import Widget from './Widget'
//import React from 'react';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Widget_Feed from './Widget_Feed';

export default function AllGroups(){

    const [groupsYoureIn, setGroupsYoureIn] = useState("");

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:8888/mygroupslist");
        setGroupsYoureIn(response.data);
        console.log(response.data)
    }

    useEffect(()=> {
        getGroupsYoureIn()
    }, []);
    const [groupsYouveMade, setGroupsYouveMade] = useState("");
    
    return (
    <div className="allgroups">
      <NavBar />
      <h1>All Groups</h1>
      <p> List of all groups ever made</p>
      <div>
          {Array.isArray(groupsYoureIn) && groupsYoureIn.map((group, index) => (
              <Widget_Feed groups={groupsYoureIn}/>
           /* <Widget
                key={index}
                 // Replace with the actual property name for the image URL
                subject={group.subjectsName} // Replace with the actual property name for the subject
                groupName={group.groupName}
            />*/
        // <h3 key={index}>{group.groupName}</h3>
        ))}
    </div>
  </div>
  ); 
 /* return(
    <div className="allgroups">
      <NavBar />
      <h1>All Groups</h1>
      <p> List of all groups ever made</p>
      <Widget_Feed/>
    </div>

  )*/
}