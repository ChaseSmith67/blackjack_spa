import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Tutorial() {
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
            <h2 className="header">
              <strong>How to Play Blackjack</strong>
            </h2>
          
        
        
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
        <div className="d-flex justify-content-center">
          <h3> Card Values </h3>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            <ul>
              <li>2 through 10 are worth their face value.</li>
              <li>Face cards &#40;J, K, Q&#41; are worth 10.</li>
              <li>
                Aces are worth either 1 or 11, depending on the value of the hand. </li>
              <li>
                &#40;If the hand value would exceed 21 with the Ace being
                valued at 11, then the Ace will be worth 1&#41;.
              </li>
            </ul>
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <h3> Gameplay </h3>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            Start of the game.
            <ul>
              <li>
                First, the player must place a bet. If the player wins the game,
                they will receive the amount of the bet, plus keep the original bet.
              </li>
              <li>
                &#40;If a player has Blackjack, they win 1.5 times their bet&#41;.
              </li>
              <li>
                The player and the dealer are both given two cards. The
                dealer's first card is face-down, so you cannot see its value.
              </li>
              </ul>
              The player's turn then begins.
              <ul>
              <li>
                The player then has the option to draw another card &#40;known as a "Hitting"&#41;
                or the player can end their turn and receive no more cards &#40;known as "Standing"&#41;.
              </li>
              <li>
                The player can continue to hit until they either have a hand they are satisfied
                with or they bust, losing the game.
              </li>
              <li>
                If the player feels they have a particularly good chance of winning the game by
                drawing only one more card, they can "Double Down", doubling their bet and 
                receiving only one more card.
              </li>
              </ul>
                When the player's turn is over, the dealer begins their turn.
              <ul>
                <li>
                  The dealer reveals their face-down card.
                </li>
                <li>
                  If the dealer's hand value is less than 17, the dealer must hit.
                </li>
                <li>
                  The dealer continues to hit until they reach at least 17 or bust.
                </li>
              </ul>
              The hands are then compared and either the player the game, collecting
              their winnings, or loses and forfeits their bet.
          </p>
        </div>
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

export default Tutorial;
