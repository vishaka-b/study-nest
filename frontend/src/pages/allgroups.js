import NavBar from '../Navbar';
import Widget from './Widget'
import './allgroups.css';
//import React from 'react';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Widget_Feed from './Widget_Feed';

export default function AllGroups(){

    const [groupsYoureIn, setGroupsYoureIn] = useState("");
    const [searchText, setSearchText] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [sortOption, setSortOption] = useState('');


    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:8888/mygroupslist");
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
      console.log(sortOption)
      setFilteredGroups(filtered);
      setSortOption('');


    };


    const handleShowAllGroups = () => {
      setSearchText('');
      setFilteredGroups(groupsYoureIn);
      setSortOption('');
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
    <h1 className='allgroups-title'>All Groups</h1>

    <div class="search-container">
      <input
        class="search-input"
        type="text"
        placeholder="Search for group, course, or owner..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
        <button onClick={handleSearch} class="search-button">Search</button>
        <button onClick={handleShowAllGroups} class="show-all-button">Show All Groups</button>
    </div>

    <div className="sort-buttons">
        <button class="sort-button" onClick={() => setSortOption('groupName')}>Sort by Group Name</button>
        <button class="sort-button" onClick={() => setSortOption('ownersName')}>Sort by Owner's Name</button>
        <button class="sort-button" onClick={() => setSortOption('courseName')}>Sort by Course Name</button>
      </div>
    
    <Widget_Feed groups={filteredGroups} sortOption={sortOption}/>
   
    </div>)
}