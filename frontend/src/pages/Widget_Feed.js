import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Widget from './Widget';

export default function WidgetFeed({groups}) {
    return (
        <Container>
          <Row xs={1} md={2} lg={3}>
            {groups.map((group, index) => (
              <Col key={index}>
                <Widget
                  groupName={group.groupName}
                  subject={group.courseName}
                  time={group.meetingTime} // Assuming you have a 'time' property in your group object
                />
              </Col>
            ))}
          </Row>
        </Container>
      );
    /*return (
        <Container>
        {groups.map((group, index) => (
            <Row xs={1} md={2} lg={3} key={index}>
            <Col>
                <Widget
                groupName={group.groupName}
                subject={group.subject}
                time={'10 am'} // Assuming you have a 'time' property in your group object
                />
            </Col>
            </Row>
        ))}
        </Container>
    );*/
    
    /*return (
    <Container>
        <Row xs={1} md={2} lg={3}>
            <Col>
                <Widget groupName={"Code Crackin' Chicks"} subject={"COM SCI 35L"} time={"Mon 5:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget groupName={"Tiny Icebergs"} subject={"COM SCI 31"} time={"Tue 8:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget groupName={"Eggheads"} subject={"COM SCI 35L"} time={"Wed 8:00 PM"}></Widget>
            </Col>
        </Row>
        <Row xs={1} md={2} lg={3}>
            <Col>
                <Widget groupName={"Reinstones"} subject={"COM SCI 33"} time={"Wed 7:00 PM"}></Widget>
            </Col>
            <Col>
                <Widget groupName={"Knockin' Icebergs"} subject={"COM SCI 32"} time={"Thu 10:00 AM"}></Widget>
            </Col>
        </Row>
    </Container>
    );*/
}