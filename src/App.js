import React, { useState, useEffect } from "react";
// import Deck from "./components/Deck";
// import Hand from "./components/Hand";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  const newDeck = () => {
    let deck = ['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
                  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
                  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS'];
    return deck;
  };

  // Fisher-Yates algorithm to shuffle the deck
  const shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // const shuffleDeck = () => {
  //   shuffleArray(deck);
  //   return deck;
  // };

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  // const [deck, setDeck] = useState(shuffleArray(newDeck()));


  function drawCard(deck) {
    let card = deck.pop();
    console.log(deck);
    // setDeck(deck);
    return card;
  };

  function dealPlayer(deck) {
    setPlayerHand(playerHand => [...playerHand, drawCard(deck)]);
  };

   function dealDealer(deck) {
    setDealerHand(dealerHand => [...dealerHand, drawCard(deck)]);
   };

   const newHand = () => {
    // Clear hands
    setDealerHand([]);
    setPlayerHand([]);

    // Create a new deck and shuffle
    let deck = shuffleArray(newDeck());
    // setDeck(() => shuffleArray(newDeck()));
    // console.log(deck);
    // console.log(freshDeck);

    // Deal Cards
    dealPlayer(deck);
    dealDealer(deck);
    dealPlayer(deck);
    dealDealer(deck);

   };

  return (
    <div className="App">

      <Container>
      <h1>Dealer's Cards</h1>
      <div className='hand' id='dealer-hand'>
        {dealerHand.map( e => <div className='card'> {e} </div>)}
        </div>
      </Container>
      <Container>
        <h1>Dealer's Cards</h1>
        <Row>
          {dealerHand.map( e => (<td><p> {e} </p></td>))}
        </Row>
      </Container>


      <h1>Your Cards</h1>
      <div className='hand' id='player-hand'>
        {playerHand.map( e => <div className='card'> {e} </div>)}
      </div>

      <button onClick={() => {newHand()}}>Deal</button>

    </div>
  );
}

export default App;
