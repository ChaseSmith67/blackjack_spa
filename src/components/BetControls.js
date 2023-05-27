import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Container, Col } from 'react-bootstrap'


function BetControls() {

    // Used to manage the player's bet.
    const [bet, setBet] = useState(0);

    // The player's current total chip count.
    const [chips, setChips] = useState(100);

    const placeBet = () => {
        setBet(bet);
    }

    const incrementBet = () => {
        if ((bet + 5) <= chips) {
        setBet(bet + 5);
        } 
    }

    const decrementBet = () => {
        if (bet >= 5) {
        setBet(bet - 5);
        }
    }

    const playerWin = (winnings=bet) => {
        setChips(chips + winnings);
    }

  return (
    <Container>
        
        <Col>
        <div className="d-flex justify-content-center">
        <h3>Bet: { bet }</h3>
        </div>
        <div className="d-flex justify-content-center">
        <div className="btn-group p-3 b-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              decrementBet();
            }}
          >
            Bet Less
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              placeBet();
            }}
          >
            Place Bet
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {incrementBet();}}
          >
            Bet More
          </button>
        </div>
        </div>
        </Col>
      
      
    </Container>
  )
}

export default BetControls