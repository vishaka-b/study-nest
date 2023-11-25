import React from 'react';
import Card from 'react-bootstrap/Card';
import './Widget.css';
import Button from 'react-bootstrap/Button';




//const Widget = ({imageUrl},{groupName}) => {
    /*const widgetStyle = {
       /* backgroundImage:`url(${imageUrl})`,*/
       //  backgroundImage: "url('./historynew.avif')"
      //}; */
export default function Widget({imageUrl,groupName, subject}) {
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
    return(
        <Card className="card-with-background" style={{ height: '315px' }}>
        <Card.Body>
            <Card.Title style={{ marginTop: '155px' }}>{groupName}</Card.Title>
            <Card.Text>
            Course: {subject}
            <br />
             Meeting time: {'10am'}
            </Card.Text>
           
            <Button variant="primary">+</Button>
        </Card.Body>
    </Card>
    );
   }

//export default Widget;
