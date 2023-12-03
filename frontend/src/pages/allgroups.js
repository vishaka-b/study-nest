import NavBar from '../Navbar';
import './allgroups.css';
import Axios from "axios";
import React, { useEffect, useState } from 'react';
import WidgetFeed from './Widget_Feed';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
  
    return (
    <div className="allgroups" >

    <NavBar />
    <Container>
    <div class="navbar-spacer"></div>
    <h1 className='section-title'>All groups</h1>
    

    <div className="side-by-side">
      <InputGroup>
        <Form.Control size="lg" type="text" placeholder="Search for group, course, or creator..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyPress={handleKeyPress}/>
        <Button size="lg" variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
      <Button size="lg" variant="primary" className="ms-3" onClick={handleShowAllGroups}>
        All
      </Button>
    </div>
    <div style={{"margin-bottom": "24px"}}>
      <Button variant="primary" className="inline-button mt-3" onClick={() => setSortOption('groupName')}>
        Sort by group
      </Button>
      <Button variant="primary" className="inline-button mt-3" onClick={() => setSortOption('ownersName')}>
        Sort by owner
      </Button>
      <Button variant="primary" className="inline-button mt-3" onClick={() => setSortOption('courseName')}>
        Sort by course
      </Button>
    </div>


    {/*<div class="search-container">
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
      </div>*/}
    
    <WidgetFeed groups={filteredGroups} sortOption={sortOption}/>
   </Container>
    </div>)
}