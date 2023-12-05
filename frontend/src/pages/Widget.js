import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Widget({groupName, subject, time, creator, days, subjectClass, members, maxMembers, resources}) {
    const [modalShow, setModalShow] = React.useState(false);
    const [secondModalShow, setSecondModalShow] = React.useState(false);
    const [addResourceTextBoxValue, setAddResourceTextBoxValue] = React.useState('');


    const toggleSecondModal = () => {
        setSecondModalShow(!secondModalShow);
      };

    const link = '/images/' + (subjectClass ?? 'other') + '.jpeg';
    const subjectMapping = {
        "computer_science": "Computer Science",
        "math": "Math",
        "history": "History",
        "english": "English",
        "chemistry": "Chemistry",
        "physics": "Physics",
        "biology": "Biology",
        "engineering": "Engineering",
        "business": "Business",
        "foreign_language": "Foreign Language",
        "linguistics": "Linguistics",
        "other": "Other"
      };

    const handleAddResource = (event) =>{
        event.preventDefault();
        if (!addResourceTextBoxValue) {
            alert("Please input a resource to add");
            return;
        }
        fetch(`http://localhost:8888/AddResource`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupName: groupName,
                    resource: addResourceTextBoxValue,
                }),                        
            })
            .then(response => response.json())
            .then(data => {
                alert("Successfully added resource to " + groupName);
                setSecondModalShow(false);
                window.location.reload(false);
                console.log(data);
                }
            )
            .catch(error => console.error('Error checking membership:', error));
        };
    
    const handleDelete = (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm('Are you sure you want to delete this group?');
        if (confirmDelete) {
            fetch(`http://localhost:8888/deleteGroup`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    groupName: groupName,
                }),                        
            })
            .then(response => response.json())
            .then(data => {
                alert("Successfully deleted " + groupName);
                setModalShow(false);
                window.location.reload(false);
                console.log(data);
            })
            .catch(error => console.error('Error checking membership:', error));
        };
            
    }

    const handleJoin = (event) => {
        event.preventDefault();
      
        // Replace 'new_value' with the actual value you want to add
        const newElement = window.sessionStorage.getItem("myUser"); 
        const username = window.sessionStorage.getItem("userName");


        // Check if the member already exists in the group
        fetch(`http://localhost:8888/checkMembership`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            groupName: groupName,
            user: newElement,
            username: username
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.isMember) {
            // Member already exists
            alert("You are already a member of this group");
            } else {
                // Member doesn't exist, proceed with the join
                fetch(`http://localhost:8888/addToGroup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        groupName: groupName,
                        user: newElement,
                        username: username
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    alert("Successfully joined " + groupName);
                    console.log(data);
                    setModalShow(false);
                    window.location.reload(false);
                    
                })
                .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error checking membership:', error));
        
    };

    const handleLeave = (event) => {
        event.preventDefault();

        const user = window.sessionStorage.getItem("myUser"); 
        const username = window.sessionStorage.getItem("userName") ;
    
        fetch(`http://localhost:8888/leaveGroup`, {
            method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        groupName: groupName,
        user: user,
        username: username
        })
        })
        .then(response => response.json())
        .then(data => {
            alert("Successfully left " + groupName);
            console.log(data);
            setModalShow(false);
            window.location.reload(false);
        })
        .catch(error => console.error('Error leaving group:', error));
    };

    const currUser = window.sessionStorage.getItem("myUser");
    let actionButton
    let resourceDisplayButton
    let numMembers = members.length
    let spotsLeft = members.length < maxMembers ? maxMembers - members.length : 0
    let resourceButton

    if (creator === currUser) {
        actionButton = <Button onClick={handleDelete}>Delete group</Button>
        resourceButton=<Button onClick={handleAddResource}>Add</Button>
        resourceDisplayButton= <Button variant="primary" className="inline-button" onClick={toggleSecondModal}>Resources</Button>
    }
    else if (members.includes(currUser)) {
        actionButton = <Button onClick={handleLeave}>Leave group</Button>
        resourceButton=<Button onClick={handleAddResource}>Add</Button>
        resourceDisplayButton= <Button variant="primary" className="inline-button" onClick={toggleSecondModal}>Resources</Button>
    }
    else if (numMembers < maxMembers) {
        actionButton = <Button onClick={handleJoin}>Join group</Button>
    }
    else {
        actionButton = <Button disabled>Full</Button>        
    }

    let resourceMessage
    if (members.includes(currUser))
    {
        if (resources.length === 0) {
            resourceMessage="No resources added yet!"
        }
        else {
            resourceMessage=<b>All resources:</b>
        }
    }
    
    let display = Array.isArray(members) ? members.join(', ') : members;

    return (
        <>
            <Card className="card-with-background" style={{marginBottom: '24px'}}>
                <Card.Img variant="top" src={link} className="card-img-top" />
                <Card.Body>
                    <Card.Title style={{"fontWeight": "bolder"}}>{groupName}</Card.Title>
                    <Card.Text>
                    <b>Course:</b> {subject}
                    <br />
                    <b>Subject:</b> {subjectMapping[subjectClass] ?? 'Other'}                
                    <br />
                    <b>Meeting day(s):</b> {Array.isArray(days) ? days.join(', ') : days}
                    <br />
                    <b>Meeting time:</b> {time}
                    </Card.Text>
                
                    <Button variant="primary" className="inline-button" onClick={() => setModalShow(true)}>More</Button>
                    {resourceDisplayButton}

                </Card.Body>
            </Card>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                scrollable={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >   
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{"fontWeight": "bolder"}}>
                        {groupName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <b>Course:</b> {subject} 
                        <br />
                        <b>Subject:</b> {subjectMapping[subjectClass] ?? 'Other'} 
                        <br />
                        <b>Meeting day(s):</b> {Array.isArray(days) ? days.join(', ') : days}
                        <br />
                        <b>Meeting time:</b> {time}
                        <br />
                        <b>Creator:</b> {creator}
                        <br />
                        <b>Member(s):</b> {display}
                        <br />
                        <b>Spot(s) left:</b> {spotsLeft}/{maxMembers}
                </Modal.Body>
                <Modal.Footer>          
                    {actionButton}
                </Modal.Footer>
            </Modal>
            <Modal
                show={secondModalShow}
                onHide={() => setSecondModalShow(false)}
                scrollable={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // Other modal configurations
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" style={{"fontWeight": "bolder"}}>
                        Resources for {groupName}
                        
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resourceMessage}
                    {resources && resources.map((resource, index) => (
                        <li key={index}>{resource}</li>
                    ))}
                </Modal.Body>
                <Modal.Footer>          
                    <InputGroup>
                        <Form.Control type="text" placeholder="Enter resource..." value={addResourceTextBoxValue} onChange={(e) => setAddResourceTextBoxValue(e.target.value)} />
                        {resourceButton}
                    </InputGroup>
                </Modal.Footer>
            </Modal>
        </>
    );
   }

