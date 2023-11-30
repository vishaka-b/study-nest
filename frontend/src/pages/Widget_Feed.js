import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Widget from './Widget';

export default function WidgetFeed({groups, sortOption, refresh}) {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const subjectsArray = [
        'computer_science',
        'math',
        'history',
        'english',
        'chemistry',
        'physics',
        'biology',
        'engineering',
        'business',
        'foreign_language',
        'linguistics',
        'other'
      ];
    
    //console.log("GROUP 51", groups[51].groupName);

    const applySorting = (groups) => {
      if (sortOption === 'groupName') {
        groups.sort((a, b) => a.groupName.localeCompare(b.groupName));
      } else if (sortOption === 'ownersName') {
        groups.sort((a, b) => a.ownersName.localeCompare(b.ownersName));
      } else if (sortOption === 'courseName') {
        groups.sort((a, b) => a.courseName.localeCompare(b.courseName));
      }
      // Add more sorting options if needed
    };
  
    // Create a copy of the groups array to avoid mutating the original array
    const sortedGroups = [...groups];
  
    // Apply sorting based on the selected option
    applySorting(sortedGroups);
    

    return (
        <Container>
          <Row xs={1} md={2} lg={3}>
            {sortedGroups.map((group, index) => (
              <Col key={index}>
                <Widget
                  groupName={group.groupName}
                  
                  selSub={group.selectedSubject}
                  subject={group.courseName}
                  time={group.meetingTime} // Assuming you have a 'time' property in your group object
                  creator={group.ownersName}
                  members={group.members}
                  subjectClass = {group.subjectClassification && (() => {
                        {/*let stringValue = group.subjectClassification.toString();*/}
                        {/*let looper=stringValue.substring(1, group.subjectClassification.length - 1).split(",");*/}
                        for (let i = 0; i < subjectsArray.length; i++) {
                            //console.log("FOR LOOP ", subjectsArray[i]);
                            //console.log("FOR LOOP looper", looper[i])
                            if (group.subjectClassification[i] === true) {
                                console.log("ITH INDEX ", subjectsArray[i]);
                                return subjectsArray[i];
                            }
                        }
                        return 'other';
                        })()}
                  refresh={refresh}
                  /*subjectClass={
                    if (group.subjectClassification===null) return null;
                    for (int i = 0; i<subjectsArray.length; i++){
                        if (group.subjectClassification[i]===true){
                            return subjectArray[i];
                        } else{
                            return null;
                        }
                    }
                  }*/

                 /* subjectClass = {
                    group.subjectClassification && group.subjectClassification.map(function (subject, index) {
                        
                      if (subject === true) {
                        return subjectsArray[index];
                      } else {
                        return null;
                      }
                    }).filter(n => n)
                  }*/
                
                  /*subjectClass={group.subjectClassification.substring(1, group.subjectClassification.length - 1).split(",").map(function (subject, index){
                    if (subject === "true")
                        return subjectsArray[index]
                    else
                        return null
                  }).filter(n => n)}
                  //subjectClass={group.subjectClassification[0]}*/


                  days={group.meetingDays.map(function (day, index) {
                    if (day === true)
                        return daysOfWeek[index]
                    else
                        return null
                  }).filter(n => n)}
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