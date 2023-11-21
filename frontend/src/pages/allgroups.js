import NavBar from '../Navbar';
import Widget from './Widget'
//import React from 'react';
import Axios from "axios";
import React, { useEffect, useState } from 'react';

export default function AllGroups(){

    const [groupsYoureIn, setGroupsYoureIn] = useState("");

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:5000/mygroupslist");
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
    {Array.isArray(groupsYoureIn) &&
  groupsYoureIn.map((group, index) => (
    <h3 key={index}>{group.groupname}</h3>
  ))}
    <Widget imageUrl={'./historynew.avif'} groupName={'HIST 3, Lec 2'}/>
    </div>)
}