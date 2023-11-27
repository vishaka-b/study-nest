import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Feed from './Feed.js'
import './home.css';
import NavBar from '../Navbar'
import Widget from './Widget'
import Widget_Feed from './Widget_Feed';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home(){

    const currUser = window.sessionStorage.getItem("myUser");

    console.log(currUser)
    const [groupsYoureIn, setGroupsYoureIn] = useState("");

    const getGroupsYoureIn=async()=>{
        const response=await Axios.get("http://localhost:8888/mygroupslist");
        setGroupsYoureIn(response.data);
    }

    useEffect(()=> {
        getGroupsYoureIn()
    }, []);
    
    const refreshGroups= async()=>{
        const response=await Axios.get("http://localhost:8888/mygroupslist");
        setGroupsYoureIn(response.data);
        console.log(response.data)
    }

    useEffect(()=> {
        refreshGroups()
    }, []);
    
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
      const [subjectClassification, setSubjectClassification] = useState({
        computer_science: false,
        math: false,
        history: false,
        english: false,
        chemistry: false,
        physics: false,
        biology: false,
        engineering: false,
        business: false,
        foreign_language: false,
        linguistics: false,
        other: false

      });
    const [selectedSubject, setSelectedSubject] = useState('other')

    const handleCreateNewGroup = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    const handleSubjectDropdownChange = (e) => {
        const selectedSubject = e.target.value;
        //setSelectedSubject(e.target.value);
        setSelectedSubject(Object.keys(subjectClassification).find((subject) => subjectClassification[subject]))
        console.log("SUBJECT: ", selectedSubject)
        setSubjectClassification((prevClassification) => ({
          ...prevClassification,
          [selectedSubject]: true
        }));
      };
    //use Axios.post 
    //on backend read the body and add to database and then send a temp response back (200 = allgood)
 ///dfsfdsfdd
 const handleJoin = (event) => {
    console.log("REACHED")
    // Make a POST request to your backend to add the current user to the members array
    fetch('http://localhost:8888/AddMember', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupName: "test", // Assuming props.name is the group name
            newMember: currUser,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response from the backend as needed
    })
    .catch(error => {
        console.error('Error joining group:', error);
    });
};
///dfsdfsfd    
    const handleFormSubmit = (event) => {
        //ensures we are at home page (have to add reload screen)
        event.preventDefault();
        if (!groupName || !ownersName || !subjectsName || !meetingTime || !Object.values(meetingDays).some(day => day)) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        if (ownersName !== currUser){
            alert("Owner Name does not match: " + currUser);
           return; 
        }
        if (currUser==null){
            currUser=""
        }

    
        // Send a POST request to the server
        fetch('http://localhost:8888/AddGroups', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupName: groupName,
                ownersName: ownersName,
                subjectsName: subjectsName,
                meetingTime: meetingTime,
                meetingDays: JSON.stringify(Object.values(meetingDays)),
                subjectClassification: JSON.stringify(Object.values(subjectClassification)),
                //selectedSubject: selectedSubject
                selectedSubject: selectedSubject
                
            }),
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        })
        .finally(() => {
            // Close the form and reset fields regardless of success or failure
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
            setSubjectClassification({
                computer_science: false,
                math: false,
                history: false,
                english: false,
                chemistry: false,
                physics: false,
                biology: false,
                engineering: false,
                business: false,
                foreign_language: false,
                linguistics: false,
                other: false

            });
            setSelectedSubject('');
            
            //refresh itself so users do not need to refresh by hand
            refreshGroups();
        });
    };

    /*
    const getGroupsYouveMade=async()=>{
        const response=await Axios.get("http://localhost:8888/getGroupsYouveMade");
        setGroupsYouveMade(response.data);
    }

    useEffect(()=> {
        getGroupsYouveMade()
    }, []);
    */
   //        <Widget imageUrl={'./chemistryimg.jpeg'}/>

   //<h3> {} ... </h3> is where widgets should go 
   //<Button variant="primary" onClick={handleCreateNewGroup}>+</Button>
    
   return (
        <div className='homepage'>
            
            <NavBar/>
            <h2>{"Welcome to StudyNest " + currUser}</h2>
            <Container>
            <div>
                <h1 class="section-title">Groups you're in</h1>
                {Array.isArray(groupsYoureIn) &&
                    <Widget_Feed groups={groupsYoureIn} />
                }
            </div>
            <div>
                <h1 class="section-title">Groups you've made</h1>
                {/* <button type="button" className="createNewGroup" onClick={handleCreateNewGroup}>+</button> */}
                <Button variant="info" onClick={handleCreateNewGroup} style={{marginBottom: '24px'}}>Create new group</Button>

                {Array.isArray(groupsYoureIn) &&
                    <Widget_Feed groups={groupsYoureIn.filter(group => group.ownersName == currUser)} />
                }

                {/*Array.isArray(groupsYoureIn) && groupsYoureIn
                
                .filter(group => group.ownersName == currUser)
                .map((group, index) => (
                    <div key={index}>
                <h3 className = "output" >Name: {group.groupName} </h3>
                <h3 className = "output" >Owner: {group.ownersName} </h3>
                
                </div>
                )) */}


            </div>
            <div className='groups'>
                <h3>{groupsYouveMade}</h3>
            </div>
            
            </Container>
            {showForm && (
        <div className="popupForm">
          <button className="closeButton" type="button" onClick={handleCloseForm}>X</button>
          <form onSubmit={handleFormSubmit} >
            <label className="textName">Group Name:
              <input type="text" name="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </label>
            <label className="textName">Owner's Name:
              <input type="text" name="ownerName" value={ownersName} onChange={(e) => setOwnersName(e.target.value)} />
            </label>
            <label className="textName">Course's Name:
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

            <div>
            <label htmlFor="subjectDropdown">Select a Subject:</label>
            <select id="subjectDropdown" onChange={handleSubjectDropdownChange} style={{ width: '232px', height: '40px' }}>
                <option value="">Select...</option>
                <option value="computer_science">Computer Science</option>
                <option value="math">Math</option>
                <option value="history">History</option>
                <option value="english">English</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
                <option value="biology">Biology</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="foreign_language">Foreign Language</option>
                <option value="linguistics">Linguistics</option>
                <option value="other">Other</option>

            </select>
            <p>Selected Subject: {Object.keys(subjectClassification).find((subject) => subjectClassification[subject])}</p>
            

            </div>

            <p></p>

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
       
    )
} 

/*import NavBar from '../Navbar';
import React from 'react';
export default function Home(){
    return (
    <div className='homepage'>
        <NavBar />
        <h1>StudyNest</h1>
        <div className="groups-in">
            <h2 className="homeBody">Groups you're in:</h2>
        
            <Widget name={"Code Crackin' Chicks"} course={"COM SCI 35L"} time={"Mon 5:00-7:00pm"}></Widget>
        </div>
        <div className="groups-made"> 
            
            <h2 className="homeBody">Groups you've made:</h2>
            <div>
                <button type="button" className="createNewGroup"> + </button>
            </div>
            
            </div>
       
        
        </div>)
}*/