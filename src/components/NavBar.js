import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { Button } from 'react-bootstrap';
import { resetStats } from './StatsService';


function NavBar() {

  return (
    
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">Blackjack Trainer</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/game">Play Game</Nav.Link>
          <Nav.Link href="/tutorial">Tutorial</Nav.Link>
          <NavDropdown title="Settings" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Button onClick={() => resetStats()} >Reset Statistics</Button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default NavBar;