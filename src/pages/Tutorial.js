import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Tutorial() {
  return (
    <Container className="p-1">
      <Container className="p-3 mb-4 bg-info rounded-3">
        <Row>
          <Col>
            <div className="d-flex justify-content-start">
              <h1>&spades; &hearts; &clubs; &diams;</h1>
            </div>
          </Col>
          <Col xs={8} className="header p-3">
            <h2>
              <strong>How to Play Blackjack</strong>
            </h2>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <h1>&spades; &hearts; &clubs; &diams;</h1>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-center p-3">
          <h3> Basic Rules </h3>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            The goal of the game is to beat the dealer. The dealer can be beaten
            in a few ways:
            <ul>
              <li>
                The player draws two cards totaling 21, known as "Blackjack",
                and the dealer does not.
              </li>
              <li>
                Having a hand value higher than the dealer's at the end of the
                round.
              </li>
              <li>
                The dealer's hand value exceeds 21 and the player is still in
                the game.
              </li>
            </ul>
            The player can lose the game to the dealer by:
            <ul>
              <li>The player's hand value exceeds 21, known as "Busting".</li>
              <li>
                The dealer's hand value is higher than the player's at the end
                of the round.
              </li>
            </ul>
          </p>
        </div>
        <div className="d-flex justify-content-center p-3">
          <h3> Card Values </h3>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            <ul>
              <li>2 through 10 are worth their face value.</li>
              <li>Face cards &#40;J, K, Q&#41; are worth 10.</li>
              <li>
                Aces are worth either 1 or 11, depending on the value of the
                hand.{" "}
              </li>
            </ul>
          </p>
        </div>
      </Container>
    </Container>
  );
}

export default Tutorial;
