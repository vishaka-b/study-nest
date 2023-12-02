import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';




function MoreModal(props) {

    const handleJoin = (event) => {
        event.preventDefault();
      
        // Replace 'new_value' with the actual value you want to add
        const newElement = window.sessionStorage.getItem("myUser");  

        // Check if the member already exists in the group
        fetch(`http://localhost:8888/checkMembership`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            groupName: props.name,
            user: newElement,
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
                groupName: props.name,
                user: newElement
                }),
            })
            .then(response => response.json())
            .then(data => {
                alert("Successfully Joined: " + props.name);
                console.log(data);
                
            })
            .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error checking membership:', error));
        };

        const handleLeave = (event) => {
            event.preventDefault();

            const user = window.sessionStorage.getItem("myUser");  
        
            fetch(`http://localhost:8888/leaveGroup`, {
                method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            groupName: props.name,
            user: user
            })
            })
            .then(response => response.json())
            .then(data => {
                alert("Successfully Left: " + props.name);
                console.log(data);
                
            })
            .catch(error => console.error('Error leaving group:', error));
};

        const currUser = window.sessionStorage.getItem("myUser");
        let actionButton
        let numMembers = props.members.length
        let spotsLeft = props.members.length < 15 ? 15 - props.members.length : 0
        if (props.creator === currUser) {
            actionButton = <Button>Delete group</Button>
        }
        else if (props.members.includes(currUser)) {
            actionButton = <Button onClick={handleLeave}>Leave group</Button>
        }
        else if (numMembers < 15) {
            actionButton = <Button onClick={handleJoin}>Join group</Button>
        }
        else {
            actionButton = <Button disabled>Full</Button>
        }
        
    
    return (
        <Modal
            {...props}
            scrollable={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{"fontWeight": "bolder"}}>
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>Course:</b> {props.course} 
                    <br />
                    <b>Meeting days:</b> {Array.isArray(props.days) ? props.days.join(', ') : props.days}
                    <br />
                    <b>Meeting time:</b> {props.time}
                    <br />
                    <b>Creator:</b> {props.creator}
                    <br />
                    <b>Member(s):</b> {Array.isArray(props.members) ? props.members.join(', ') : props.members}
                    <br />
                    <b>Spot(s) left:</b> {spotsLeft}/15
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleJoin}>Join</Button>                
                {actionButton}
            </Modal.Footer>
        </Modal>
    );
}


export default function Widget({groupName, subject, time, creator, days, subjectClass, members}) {


    const [modalShow, setModalShow] = React.useState(false);
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


    return(
        <>
            <MoreModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                name={groupName}
                course={subject}
                days={days}
                time={time}
                creator={creator}
                members={members}

            />
            <Card className="card-with-background" style={{marginBottom: '24px'}}>
                <Card.Img variant="top" src={link} className="card-img-top" />
                <Card.Body>
                    <Card.Title style={{"fontWeight": "bolder"}}>{groupName}</Card.Title>
                    <Card.Text>
                    <b>Course:</b> {subject}
                    <br />
                    <b>Subject:</b> {subjectMapping[subjectClass] ?? 'Other'}                
                    <br />
                    <b>Meeting days:</b> {Array.isArray(days) ? days.join(', ') : days}
                    <br />
                    <b>Meeting time:</b> {time}
                    </Card.Text>
                
                    <Button variant="primary" onClick={() => setModalShow(true)}>More</Button>
                </Card.Body>
            </Card>
        </>
    );
   }

