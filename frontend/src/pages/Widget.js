//import React from 'react';
import Card from 'react-bootstrap/Card';
/* import './Widget.css'; */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';




function MoreModal(props) {
    const currUser = window.sessionStorage.getItem("myUser");

        //vishaka code
       /* const handleJoin = (event) => {
            console.log("REACHED")
            // Make a POST request to your backend to add the current user to the members array
        axios.post('http://localhost:8888/AddMember', {
                groupName: props.name, // Assuming props.name is the group name
                newMember: currUser,
        })

        .then(data => {
            console.log(data); // Handle the response from the backend as needed
        })
        .catch(error => {
            console.error('Error joining group:', error);
        });
    }*/

        
    //vishaka code
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Course: {props.course}
                    <br />
                    Meeting days: {Array.isArray(props.days) ? props.days.join(', ') : props.days}
                    <br />
                    Meeting time: {props.time}
                    <br />
                    Creator: {props.creator}
                    <br />
                    Member(s): {props.members}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button /*onClick={handleJoin}*/>Join</Button>
            </Modal.Footer>
        </Modal>
    );
}


//const Widget = ({imageUrl},{groupName}) => {
    /*const widgetStyle = {
       /* backgroundImage:`url(${imageUrl})`,*/
       //  backgroundImage: "url('./historynew.avif')"
      //}; */
export default function Widget({groupName, subject, time, creator, days, subjectClass, selSub}) {
    //console.log("SUBJECT CLASS, ",subjectClass);

    /*const [selectedSubject, updateSelectedSubject] = useState('history');
    const [subjectKeys, setSubjectKeys]= useState([])

    //const selectedSubject = 'history';
    //const subjectKeys= null;
    if (!subjectClass || typeof subjectClass !== 'object') {
        

    }else{
        setSubjectKeys(Object.keys(subjectClass));
        updateSelectedSubject(Object.keys(subjectClass).find((subject) => subjectClass[subject]));
    }*/

    const [imageExists, setImageExists] = useState(true);
    //const selectedSubject = subjectClass && Object.keys(subjectClass).find((subject) => subjectClass[subject]);

    /*return (
        <div id="widget-container">
            <div id="title-bar">
                <h2>{groupName}</h2>
                
            </div>
            <div id="course-bar">
            <h3>{subject}</h3>
            </div>
            <div id="button-container">
                <button>+</button>
            </div>
            {/* Your widget content goes here *///}
       /* </div>      
    );*/

   /* const backgroundImages = {
        computer_science: '/images/cs.jpeg',
        math: '/images/math.jpeg',
        history: '/images/history.jpeg',
        // Add more mappings as needed
      };*/

     /* useEffect(() => {
        const imagePath = `/images/${subjectClass}.jpeg`; // Adjust the path accordingly
    
        // Use the imageExists state to determine whether the image exists
        const img = new Image();
        img.onload = () => setImageExists(true);
        img.onerror = () => setImageExists(false);
        img.src = imagePath;
      }, [subjectClass]);*/

      

      //const defaultSubject = selectedSubject;


    const [modalShow, setModalShow] = React.useState(false);

    const renderSubjects = () => {
      /*  if (!subjectClass || typeof subjectClass !== 'object') {
            return null; // or any default content if subjectClass is undefined or not an object
          }
        return Object.entries(subjectClass).map(([subject, isSelected]) => {
          if (isSelected) {
            return <div key={subject}>{subject}</div>;
          }
          return null; // or any other default content when the subject is not selected
        });*/
    }

    //const link= '/images/'+ subjectClass + '.jpeg';
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
            />
            <Card className="card-with-background" style={{marginBottom: '24px'}}>
                <Card.Img variant="top" src={link} class="card-img-top" />
                <Card.Body>
                    <Card.Title>{groupName}</Card.Title>
                    <Card.Text>
                    Course: {subject}
                    
                    <div>
                    Subject: {subjectMapping[subjectClass] ?? 'Other'}
                    </div>                   
                     <br />
                    Meeting days: {Array.isArray(days) ? days.join(', ') : days}
                    <br />
                    Meeting time: {time}
                    </Card.Text>
                
                    <Button variant="primary" onClick={() => setModalShow(true)}>More</Button>
                </Card.Body>
            </Card>
        </>
    );
   }

//export default Widget;
