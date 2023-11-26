import React from 'react';
import Card from 'react-bootstrap/Card';
/* import './Widget.css'; */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function MoreModal(props) {
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
                    Meeting days: {props.days}
                    <br />
                    Meeting time: {props.time}
                    <br />
                    Creator: {props.creator}
                    <br />
                    Member(s): {props.members}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button>Join</Button>
            </Modal.Footer>
        </Modal>
    );
}


//const Widget = ({imageUrl},{groupName}) => {
    /*const widgetStyle = {
       /* backgroundImage:`url(${imageUrl})`,*/
       //  backgroundImage: "url('./historynew.avif')"
      //}; */
export default function Widget({groupName, subject, time, creator, days}) {
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

    const [modalShow, setModalShow] = React.useState(false);
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
                <Card.Img variant="top" src={"/images/cs.jpeg"} class="card-img-top" />
                <Card.Body>
                    <Card.Title>{groupName}</Card.Title>
                    <Card.Text>
                    Course: {subject}
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
