import React, { useState, useEffect } from "react";
// import Deck from "./components/Deck";
// import Hand from "./components/Hand";

function App() {

  const newDeck = () => {
    const deck = ['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
                  'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
                  'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
                  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS'];
    return deck;
  };

  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [deck, setDeck] = useState(newDeck());

  const drawCard = () => {
    let card = deck.pop(Math.floor(Math.random() * deck.length));
    setDeck(deck);
    return card;
  };

  const dealPlayer = () => {
    setPlayerHand(playerHand => [...playerHand, drawCard()]);
  };

  return (
    <div className="App">

      <h1>Dealer's Cards</h1>
      <div>{dealerHand}</div>

      <h1>Your Cards</h1>
      <div>
        {playerHand}
      </div>

      <button onClick={() => {dealPlayer()}}>Deal</button>

    </div>
  );
}

export default App;
