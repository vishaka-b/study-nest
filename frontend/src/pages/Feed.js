import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

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
                <h4>{props.course}</h4>
                <p>
                    Meeting days: {props.days}
                    <br />
                    Meeting time: {props.time}
                    <br />
                    Creator: {props.creator}
                    <br />
                    Members: {props.members}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button>Join</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Widget(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <MoreModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                name={props.name}
                course={props.course}
                days={props.days}
                time={props.time}
            />
            <Card className="widget">
            <Card.Img variant="top" src="holder.js/100px160"/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                Course: {props.course}
                <br />
                Meeting days: {props.days}
                </Card.Text>
                
                <Button variant="primary" onClick={() => setModalShow(true)}>More</Button>
                
            </Card.Body>
            </Card>
        </>
        
        /*
        <div className="widget">
            <h1>{name}</h1>
            <h3>Course: {course}</h3>
            <h3>Meeting time: {time}</h3>
            <button>More</button>
        </div>
        */
    );
}

export default function Feed() {
    return (
    <Container>
        <Row xs={1} md={2} lg={3}>
            <Col>
                <Widget name={"Code Crackin' Chicks"} course={"COM SCI 35L"} days={["Mon", "Tues"]} time={"5:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget name={"Tiny Icebergs"} course={"COM SCI 31"} time={"Tue 8:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget name={"Eggheads"} course={"COM SCI 35L"} time={"Wed 8:00 PM"}></Widget>
            </Col>
        </Row>
        <Row xs={1} md={2} lg={3}>
            <Col>
                <Widget name={"Reinstones"} course={"COM SCI 33"} time={"Wed 7:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget name={"Knockin' Icebergs"} course={"COM SCI 32"} time={"Thu 10:00 AM"}></Widget>
            </Col>
        </Row>
    </Container>
    );
}