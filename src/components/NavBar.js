import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { Button } from "react-bootstrap";
import { resetStats } from "./StatsService";

function NavBar(props) {
  const toggle = () => props.toggle();

  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Blackjack Trainer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              
              <NavDropdown.Item>
                <Button onClick={() => toggle()}>Change Theme</Button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Button onClick={() => resetStats()}>Reset Statistics</Button>
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
