import NavBar from '../Navbar';
import Widget from './Widget'
//import React from 'react';
import Axios from "axios";
import React, { useEffect, useState } from 'react';

export default function AllGroups(){

    const [groupsYoureIn, setGroupsYoureIn] = useState("");
    const [searchText, setSearchText] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:5000/mygroupslist");
        setGroupsYoureIn(response.data);
        setFilteredGroups(response.data);
        console.log(response.data)
    }
    

    const handleSearch = () => {
      const filtered = groupsYoureIn.filter((group) => {
        return (
        
          group.groupName.toLowerCase().includes(searchText.toLowerCase()) ||
          group.ownersName.toLowerCase().includes(searchText.toLowerCase()) ||
          group.courseName.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredGroups(filtered);
    };

    const handleShowAllGroups = () => {
      setSearchText('');
      setFilteredGroups(groupsYoureIn);
      console.log(groupsYoureIn);

    };

    useEffect(()=> {
        getGroupsYoureIn()
    }, []);
    const [groupsYouveMade, setGroupsYouveMade] = useState("");

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
    
    return (
    <div className="allgroups">
    <NavBar />
    <h1>All Groups</h1>
    <p> List of all groups</p>

    <div>
        <input
          type="text"
          placeholder="Search for group, course, or owner..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleShowAllGroups}>Show All Groups</button>
      </div>

    <div>
    {Array.isArray(filteredGroups) &&
  filteredGroups.map((group, index) => (
    <h3 key={index}>{group.groupName}</h3>
  ))}
    </div>
   
    </div>)
}