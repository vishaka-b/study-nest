import Axios from "axios";
import React, { useEffect, useState } from 'react';
import './home.css';
import NavBar from '../Navbar'
import WidgetFeed from './Widget_Feed';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(){

    const [modalShow, setModalShow] = React.useState(false);

    const currUser = window.sessionStorage.getItem("myUser");
    const userName = window.sessionStorage.getItem("userName");

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
    
    const [groupName, setGroupName] = useState('');
    const [subjectsName, setSubjectsName] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
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

    const handleSubjectDropdownChange = (e) => {
        const selectedSubject = e.target.value;
        setSelectedSubject(Object.keys(subjectClassification).find((subject) => subjectClassification[subject]))
        console.log("SUBJECT: ", selectedSubject)

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
      };


    const handleFormSubmit = (event) => {
        // Ensure we are at home page
        event.preventDefault();
        
        if (!groupName || !subjectsName || !meetingTime || !maxMembers || !Object.values(meetingDays).some(day => day)) {
            alert("Please fill in all fields before submitting");
            return;
        }
        const g = groupsYoureIn.filter(group => group.groupName === groupName)
        if (g.length !== 0){
            alert("Group name already exists; please change name to make a new group");
            return;
        }
        const members = [currUser]
        const usernames = [userName];
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
                meetingDays: Array.from(Object.values(meetingDays)),
                subjectClassification: Array.from(Object.values(subjectClassification)),
                selectedSubject: selectedSubject,
                members: members,
                maxMembers: maxMembers,
                usernames: usernames
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
            setGroupName('');
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
            setMaxMembers('');
            
            setModalShow(false);
            window.location.reload(false);
        });
    };
    
   return (
        <div className='homepage'>
            
            <NavBar/>
            <Container>
            <div className="navbar-spacer"></div>
            <h1 className="welcome-message">{"Welcome to Study Nest, " + userName + "!"}</h1>
            
            <div>
                <h1 className="section-title">Groups you've created</h1>
                <Button variant="primary" className="large-button" size="lg" onClick={() => setModalShow(true)}>
                Create new group
                </Button>

                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    scrollable={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                    <Modal.Title style={{"fontWeight": "bolder"}} id="contained-modal-title-vcenter">
                        Create new group
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form id="groupForm" onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Group:</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Course:</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter course name" value={subjectsName} onChange={(e) => setSubjectsName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><b>Subject:</b></Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleSubjectDropdownChange}>
                                <option>Choose subject</option>
                                <option value="biology">Biology</option>
                                <option value="business">Business</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="computer_science">Computer Science</option>
                                <option value="engineering">Engineering</option>
                                <option value="english">English</option>
                                <option value="foreign_language">Foreign Language</option>
                                <option value="history">History</option>
                                <option value="linguistics">Linguistics</option>
                                <option value="math">Math</option>
                                <option value="physics">Physics</option>
                                <option value="other">Other</option>
                            </Form.Select>
                            </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label><b>Meeting days:</b></Form.Label>
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
                            <Form.Label><b>Meeting time:</b></Form.Label>
                            <Form.Control type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label><b>Maximum group size:</b></Form.Label>
                            <Form.Control type="number" min="2" max="16" value={maxMembers} onChange={(e) => setMaxMembers(e.target.value)}/>
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
                    <WidgetFeed groups={groupsYoureIn.filter(group => group.ownersName === currUser)} sortOption = {''} />
                }

            </div>
            <div>
                <h1 className="section-title">Groups you've joined</h1>
                <Button variant="primary" href="/allgroups" className="large-button" size="lg">
                Find more groups to join
                </Button>
                {Array.isArray(groupsYoureIn) &&
                    <WidgetFeed groups={groupsYoureIn.filter(group => group.members.includes(currUser) && group.ownersName !== currUser)} sortOption={''} />
                }
            </div>
            
            </Container>
             
    </div>
       
    )
} 