import NavBar from '../Navbar';
import Widget from './Widget'
import React from 'react';
export default function AllGroups(){
    return (
    <div className="allgroups">
    <NavBar />
    <h1>All Groups</h1>
    <p> List of all groups ever made</p>
    <Widget imageUrl={'./historynew.avif'} groupName={'HIST 3, Lec 2'}/>
    </div>)
}