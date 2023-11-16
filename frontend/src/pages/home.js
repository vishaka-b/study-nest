import Axios from "axios";
import React, { useEffect, useState } from 'react';
import './home.css';


export default function Home(){
/*
    const [groupsYoureIn, setGroupsYoureIn] = useState("");

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:5000/getGroupsYoureIn");
        setGroupsYoureIn(response.data);
    }

    useEffect(()=> {
        getGroupsYoureIn()
    }, []);
    */
    
    
    const [groupsYouveMade, setGroupsYouveMade] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [ownersName, setOwnersName] = useState('');
    const [subjectsName, setSubjectsName] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [meetingDays, setMeetingDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      });

    const handleCreateNewGroup = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    const handleFormSubmit = () => {

        if (!groupName || !ownersName || !subjectsName || !meetingTime || !Object.values(meetingDays).some(day => day)) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Handle form submission logic here
        // You can send the form data to the server or perform any other necessary actions
        // For example, you can use Axios.post to send the data to the server
        // After handling the submission, close the form

        
        setShowForm(false);
        setGroupName('');
        setOwnersName('');
        setSubjectsName('');
        setMeetingTime('');
        setMeetingDays({
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          });
    }

    const getGroupsYouveMade=async()=>{
        const response=await Axios.get("http://localhost:5000/getGroupsYouveMade");
        setGroupsYouveMade(response.data);
    }

    useEffect(()=> {
        getGroupsYouveMade()
    }, []);

    return (<>
    
        <h1>StudyNest</h1>
        <div>
            <h2 className="homeBody">Groups you're in:</h2>
        
        </div>
        <div> 
            <div className='groupLine'>
                <h2 className="homeBody2">Groups you've made:</h2>
                <button type="button" className="createNewGroup" onClick={handleCreateNewGroup}> + </button>
            </div>
            
            <div className='groups'>
                <h3 >{groupsYouveMade}</h3>
            </div>
            
            

            {showForm && (
        <div className="popupForm">
          <button className="closeButton" type="button" onClick={handleCloseForm}>X</button>
          <form onSubmit={handleFormSubmit}>
            <label className="textName">Group Name:
              <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </label>
            <label className="textName">Owner's Name:
              <input type="text" value={ownersName} onChange={(e) => setOwnersName(e.target.value)} />
            </label>
            <label className="textName">Subject's Name:
              <input type="text" value={subjectsName} onChange={(e) => setSubjectsName(e.target.value)} />
            </label>
            <label className="meetingDays">Meeting Days:</label>
            <div className="daysOfWeek">
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.monday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, monday: e.target.checked })}
                    />
                    Mon
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.tuesday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, tuesday: e.target.checked })}
                    />
                    Tues
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.wednesday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, wednesday: e.target.checked })}
                    />
                    Wed
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.thursday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, thursday: e.target.checked })}
                    />
                    Thurs
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.friday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, friday: e.target.checked })}
                    />
                    Fri
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.saturday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, saturday: e.target.checked })}
                    />
                    Sat
                </label>
                <label className="dayOfWeek">
                    <input
                    type="checkbox"
                    checked={meetingDays.sunday}
                    onChange={(e) => setMeetingDays({ ...meetingDays, sunday: e.target.checked })}
                    />
                    Sun
                </label>
            </div>

            <label>Hour of the Day:
                <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                />
            </label>
            <button className="submitButton" type="submit">Submit</button>
          </form>
        </div>
      )}
            
            </div>
       
        
        </>)
}