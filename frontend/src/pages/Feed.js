import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function Widget({name, course, time}) {
    return (
        <Card className="widget">
            <Card.Img variant="top" src="holder.js/100px160"/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                Course: {course}
                <br />
                Meeting time: {time}
                </Card.Text>
                <Button variant="primary">More</Button>
            </Card.Body>
        </Card>
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
                <Widget name={"Code Crackin' Chicks"} course={"COM SCI 35L"} time={"Mon 5:00 PM"}></Widget>
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