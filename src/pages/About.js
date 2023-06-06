import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <Container className="p-1">
      <Container className="p-3 mb-4 bg-success rounded-3">
        <Row>
          <Col>
            <div className="d-flex justify-content-start">
              <h1>&spades; &hearts; &clubs; &diams;</h1>
            </div>
          </Col>
          <Col  xs={6} className="p-3">

        <div className="d-flex justify-content-center p-3">
          <h3> This app was created by Chase Smith</h3>
          </div>
          <Container className="bg-dark rounded-3">
          <div className="d-flex justify-content-center">
          <a href="https://github.com/ChaseSmith67">
             https://github.com/ChaseSmith67 </a>
        </div>
        </Container>
        </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <h1>&spades; &hearts; &clubs; &diams;</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
