import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className="navbar-body" variant="dark" >
      <Container>
        <Navbar.Brand href="/Home" className="navbar-title">Study Nest</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto navbar-item">
            <Nav.Link href="/Home">Your groups</Nav.Link>
            <Nav.Link href="/allgroups">All groups</Nav.Link>
            <Nav.Link href="/">Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}