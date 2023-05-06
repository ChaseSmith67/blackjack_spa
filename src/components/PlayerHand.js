import React, { useState } from 'react'
import Deck from './Deck';
import Container from 'react-bootstrap/Container';


function PlayerHand(props) {

    const playerHand = props.playerHand;
    const playerHandValue = props.playerHandValue;
    
    



  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Your Cards</h1>
          <div className="d-flex justify-content-center">
          {playerHand.map( e => (<td><Container className="card"> {e} </Container></td>))}
          </div>
          <div className="d-flex justify-content-center">{ playerHandValue }</div>
      </Container>
  )
}

export default PlayerHand