import Axios from "axios";
import React, { useEffect, useState } from 'react';
import Feed from './Feed.js'
import './home.css';
import NavBar from '../Navbar'
import Widget from './Widget'
import Widget_Feed from './Widget_Feed';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(){

    const [modalShow, setModalShow] = React.useState(false);

    const currUser = window.sessionStorage.getItem("myUser");
    let userName = "";
    if (window.sessionStorage.getItem("userName") === undefined || window.sessionStorage.getItem("userName") === "")
        userName = currUser;
    else
        userName = window.sessionStorage.getItem("userName");

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
        console.log(response.data);
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

        //new code
      /*  setSubjectClassification((prevClassification) => {
            const updatedClassification = {};
        
            // Set the selected subject to true
            updatedClassification[selectedSubject] = true;
        
            // Set all other subjects to false
            Object.keys(prevClassification).forEach((subject) => {
              if (subject !== selectedSubject) {
                updatedClassification[subject] = false;
              }
            });
            return updatedClassification;
            });*/

        
        //new code
        let updatedClassification= {
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

        }
        updatedClassification[selectedSubject] = true;
        setSubjectClassification(updatedClassification);

        /*setSubjectClassification((prevClassification) => ({
          ...prevClassification,
          [selectedSubject]: true
        }));*/

      };
    //use Axios.post 
    //on backend read the body and add to database and then send a temp response back (200 = allgood)

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

    const handleFormSubmit = (event) => {
        //ensures we are at home page (have to add reload screen)
        event.preventDefault();
        if (!groupName || !subjectsName || !meetingTime || !Object.values(meetingDays).some(day => day)) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        /*
        if (ownersName !== currUser){
            alert("Owner Name does not match: " + currUser);
           return; 
        }
        if (currUser==null){
            currUser=""
        }
        */

        const members = [currUser]
        // Send a POST request to the server
        fetch('http://localhost:8888/AddGroups', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupName: groupName,
                ownersName: currUser,
                subjectsName: subjectsName,
                meetingTime: meetingTime,
                /*
                meetingDays: Array.from(Object.values(meetingDays)),
                subjectClassification: Array.from(Object.values(subjectClassification)),
                */
                meetingDays: Array.from(Object.values(meetingDays)),
                subjectClassification: Array.from(Object.values(subjectClassification)),
                //selectedSubject: selectedSubject
                selectedSubject: selectedSubject,
                members: members
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
            setModalShow(false);
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
            <h2 className="welcome-message">{"Welcome to Study Nest, " + userName + "!"}</h2>
            <Container>
            <div>
                <h1 class="section-title">Groups you've created</h1>
                {/* <button type="button" className="createNewGroup" onClick={handleCreateNewGroup}>+</button> */}
                <Button variant="primary" className="mb-3" onClick={() => setModalShow(true)}>
                Create new group
                </Button>

                {/*<FormModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={handleFormSubmit}

                />*/}

                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    scrollable={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create new group
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form id="groupForm" onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Group:</Form.Label>
                            <Form.Control type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Course:</Form.Label>
                            <Form.Control type="text" placeholder="Enter course name" value={subjectsName} onChange={(e) => setSubjectsName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject:</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleSubjectDropdownChange}>
                                <option>Choose subject</option>
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
                            </Form.Select>
                            </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Meeting days:</Form.Label>
                            <div className="mb-3">
                                <Form.Check
                                    inline
                                    label="Mon"
                                    type={'checkbox'}
                                    checked={meetingDays.monday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, monday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Tue"
                                    type={'checkbox'}
                                    checked={meetingDays.tuesday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, tuesday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Wed"
                                    type={'checkbox'}
                                    checked={meetingDays.wednesday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, wednesday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Thu"
                                    type={'checkbox'}
                                    checked={meetingDays.thursday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, thursday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Fri"
                                    type={'checkbox'}
                                    checked={meetingDays.friday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, friday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Sat"
                                    type={'checkbox'}
                                    checked={meetingDays.saturday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, saturday: e.target.checked })}
                                />
                                <Form.Check
                                    inline
                                    label="Sun"
                                    type={'checkbox'}
                                    checked={meetingDays.sunday}
                                    onChange={(e) => setMeetingDays({ ...meetingDays, sunday: e.target.checked })}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Meeting time:</Form.Label>
                            <Form.Control type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)}/>
                        </Form.Group>
                        
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button form="groupForm" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>


                {Array.isArray(groupsYoureIn) &&
                    <Widget_Feed groups={groupsYoureIn.filter(group => group.ownersName === currUser)} sortOption = {''} />
                }

            </div>
            <div>
                <h1 class="section-title">Groups you've joined</h1>
                {Array.isArray(groupsYoureIn) &&
                    <Widget_Feed groups={groupsYoureIn.filter(group => group.members.includes(currUser) && group.ownersName !== currUser)} sortOption={''} />
                }
            </div>
            
            </Container>
             
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