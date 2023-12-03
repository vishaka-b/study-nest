import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Widget from './Widget';

export default function WidgetFeed({groups, sortOption}) {
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
    
    const applySorting = (groups) => {
      if (sortOption === 'groupName') {
        groups.sort((a, b) => a.groupName.localeCompare(b.groupName));
      } else if (sortOption === 'ownersName') {
        groups.sort((a, b) => a.ownersName.localeCompare(b.ownersName));
      } else if (sortOption === 'courseName') {
        groups.sort((a, b) => a.courseName.localeCompare(b.courseName));
      }
    };
  
    // Create a copy of the groups array to avoid mutating the original array
    const sortedGroups = [...groups];
  
    // Apply sorting based on the selected option
    applySorting(sortedGroups);
    

    return (
        
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
                        for (let i = 0; i < subjectsArray.length; i++) {
                            if (group.subjectClassification[i] === true) {
                                console.log("ITH INDEX ", subjectsArray[i]);
                                return subjectsArray[i];
                            }
                        }
                        return 'other';
                        })()}

                  days={group.meetingDays.map(function (day, index) {
                    if (day === true)
                        return daysOfWeek[index]
                    else
                        return null
                  }).filter(n => n)}
                  maxMembers={group.maxMembers}
                />
              </Col>
            ))}
          </Row>
        
    );
}