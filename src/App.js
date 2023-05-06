import React, { useState, useEffect } from "react";
// import Deck from "./components/Deck";
// import Hand from "./components/Hand";
import './App.css';
import Container from 'react-bootstrap/Container';

function App() {

  const newDeck = () => {
    let deck = ['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
                  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
                  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS'];
    
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

    return shuffleArray(deck);
  };



  const [deck, setDeck] = useState(newDeck);
  // const [count, setCount] = useState(0);
  // const [playerTurn, setPlayerTurn] = useState(true);
  const [playerHand, setPlayerHand] = useState({cards: [], value: 0, });
  const [dealerHand, setDealerHand] = useState({cards: [], value: 0, });

  const clearTable = () => {
    setPlayerHand((prev) => ({ ...prev, cards: [] }));
    setDealerHand((prev) => ({ ...prev, cards: [] }));
  };

  useEffect(() => {
    setPlayerHand(prev => ({...prev, value: 0 }));
    for (let i = 0; i < playerHand.cards.length; i++) {
      let cardVal = evalCard(playerHand.cards[i]);
      setPlayerHand(prev => ({...prev, value: prev.value + cardVal }));
    }
  }, [playerHand.cards]);

  useEffect(() => {
    setDealerHand(prev => ({...prev, value: 0 }));
    for (let i = 0; i < dealerHand.cards.length; i++) {
      let cardVal = evalCard(dealerHand.cards[i]);
      setDealerHand(prev => ({...prev, value: prev.value + cardVal }));
    }
  }, [dealerHand.cards]);


  const evalCard = (card) => {
    switch (card[0]) {
      case "K":
      case "Q":
      case "J":
      case "1":
        return 10;
      case "A":
        return 11;
      default:
        return parseInt(card[0]);
    };
  };

  const dealPlayer = (deck) => {
    let card = deck.shift();
    setPlayerHand(prev => ({cards: [...prev.cards, card]}));
    let updatedDeck = deck;
    setDeck(updatedDeck);
  };

  const dealDealer = (deck) => {
    let card = deck.shift();
    setDealerHand(prev => ({cards: [...prev.cards, card]}));
    let updatedDeck = deck;
    setDeck(updatedDeck);
  };

   

   const newHand = () => {
    // Clear hands
    clearTable();

    // // Create new deck
    // let freshDeck = newDeck();
    // setDeck(deck => newDeck());

    // Deal Cards
    dealPlayer(deck);
    console.log(deck);
    dealDealer(deck);
    console.log(deck);
    dealPlayer(deck);
    dealDealer(deck);

   };

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Dealer's Cards</h1>
          <div className="d-flex justify-content-center">
          {dealerHand.cards.map( e => (<td><Container className="card"> {e} </Container></td>))}
          </div>
          <div className="d-flex justify-content-center">{ dealerHand.value }</div>
      </Container>


      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Your Cards</h1>
          <div className="d-flex justify-content-center">
          {playerHand.cards.map( e => (<td><Container className="card"> {e} </Container></td>))}
          </div>
          <div className="d-flex justify-content-center">{ playerHand.value }</div>
      </Container>


      <button type="button" className="btn btn-primary p-3 b-1"
        onClick={() => {newHand()}}>Deal</button>

      <div className="d-flex justify-content-center">
        <div className="btn-group btn-group-lg p-3 b-1">
          <button type="button" className="btn btn-primary"
            onClick={() => {dealPlayer(deck)}}>Hit</button>
          <button type="button" className="btn btn-primary"
            onClick={() => console.log('stand')}>Stand</button>
          <button type="button" className="btn btn-primary"
            onClick={() => console.log('double')}>Double</button>
          <button type="button" className="btn btn-primary"
            onClick={() => console.log('split')}>Split</button>
        </div>
      </div>
      
    </Container>
  );
}

export default App;
