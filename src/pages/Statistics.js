import React from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import { getBlackJackStats } from "../components/StatsService";
import { useState, useEffect } from "react";

function Statistics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getBlackJackStats().then((stats) => setStats(stats)); // Retrieve the stats
  }, []);

  return (
    <Container className="p-1">
      <Container className="p-3 mb-4 bg-success rounded-3">
        <Row>
          <div className="d-flex justify-content-center">
            <h1>Win/Loss Statistics</h1>
          </div>
        </Row>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win/Loss Percentage</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(function (e) {
              return (
                <tr>
                  <td> {e.name} </td>
                  <td> {e.wins} </td>
                  <td> {e.losses} </td>
                  <td> {(e.wins / (e.wins + e.losses)) * 100}% </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
}

export default Statistics;
