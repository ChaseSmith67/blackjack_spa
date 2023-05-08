import React, { useState, useEffect } from "react";
import './App.css';
import Container from 'react-bootstrap/Container';


class Card {
  constructor(value, suit, image, visible = true) {
      this.value = value;
      this.suit = suit;
      this.image = image;
      this.visible = visible;
  }
}

function App() {

  const newDeck = () => {

    const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let deck = [];

    for (let suit of suits) {
      for (let value of values) {
          deck.push(new Card(value, suit, "images/" + suit + "/" + value + ".png"));
      }
    }
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
  const [playerTurn, setPlayerTurn] = useState(null);
  const [gameOver, setGameOver] = useState(null);
  const [dealerTurn, setDealerTurn] = useState(null);
  const [playerHand, setPlayerHand] = useState({cards: [], value: 0, });
  const [dealerHand, setDealerHand] = useState({cards: [], value: 0, });
  const [message, setMessage] = useState('');

// Resets Hands and Deck
  const clearTable = () => {
    setPlayerHand((prev) => ({ ...prev, cards: [] }));
    setDealerHand((prev) => ({ ...prev, cards: [] }));
    // Create new deck
    let freshDeck = newDeck();
    setDeck({...freshDeck});
  };

// Manages whose turn it is and whether game is over
  useEffect(() => {
    console.log('useEffect called',
    'playerTurn =', playerTurn,
    'gameOver =', gameOver,
    'dealerTurn =', dealerTurn);
    if (playerTurn && !gameOver && !dealerTurn) {
      dealerHand.cards[0].visible = false;
    }
    else if (!playerTurn && !gameOver && dealerTurn) {
      dealerHand.cards[0].visible = true;
      if (dealerHand.value < 17) {
        dealDealer(deck);
      } else {
        setDealerTurn(false);
        setGameOver(true);
      }
    } else if (!playerTurn && gameOver && !dealerTurn) {
      evalHands();
    }}, [playerTurn, gameOver, dealerHand, dealerTurn]);

// Recalculate value of player's hand
  useEffect(() => {
    setPlayerHand(prev => ({...prev, value: 0 }));
    for (let i = 0; i < playerHand.cards.length; i++) {
      let cardVal = evalCard(playerHand.cards[i]);
      setPlayerHand(prev => ({...prev, value: prev.value + cardVal }));
    }
    if (playerHand.value === 21 && playerHand.cards.length === 2) {
      setMessage('Blackjack!');
      setPlayerTurn(false);
      setGameOver(true);
    } else if (playerHand.value > 21) {
      setPlayerTurn(false);
      setGameOver(true);
      setMessage('Player Busts!');
    };
  }, [playerHand.cards, playerHand.value]);

// Recalculate value of dealer's hand
  useEffect(() => {
    setDealerHand(prev => ({...prev, value: 0 }));
    for (let i = 0; i < dealerHand.cards.length; i++) {
      if (dealerHand.cards[i].visible) {
      let cardVal = evalCard(dealerHand.cards[i]);
      setDealerHand(prev => ({...prev, value: prev.value + cardVal }));
      };
    }
    if (dealerHand.value === 21 && dealerHand.cards.length === 2) {
      setMessage('Dealer Blackjack!');
      setPlayerTurn(false);
      setDealerTurn(false);
      setGameOver(true);
    } else if (dealerHand.value > 21) {
      setDealerTurn(false);
      setGameOver(true);
      setPlayerTurn(false);
      setMessage('Dealer Busts!');
    };
  }, [dealerHand.cards, dealerHand.value]);

// Changes the message shown to the player
  useEffect(() => {
    console.log('message', message);
  }, [message]);

// Parses the card data into numerical values
/* TODO: Determine how to handle Aces (Soft/Hard) */
  const evalCard = (card) => {
    switch (card.value) {
      case "K":
      case "Q":
      case "J":
      case "1":
        return 10;
      case "A":
        return 11;
      default:
        return parseInt(card.value);
    };
  };

// Deal a card from the deck to the player
  const dealPlayer = (deck) => {
    let card = deck.shift();
    setPlayerHand(prev => ({cards: [...prev.cards, card]}));
    let updatedDeck = deck;
    setDeck(updatedDeck);
  };

// Deal a card from the deck to the dealer
  const dealDealer = (deck) => {
    let card = deck.shift();
    setDealerHand(prev => ({cards: [...prev.cards, card]}));
    let updatedDeck = deck;
    setDeck(updatedDeck);
  };

   const playerHit = () => {
    if (playerTurn) {
      dealPlayer(deck);
    } else {
      window.alert("It's not your turn!");
    }
  };

   const newHand = (deck) => {
    // Clear hands
    clearTable();
    setGameOver(false);
    setDealerTurn(false);

    // Deal Cards
    dealPlayer(deck);
    console.log(deck);
    dealDealer(deck);
    console.log(deck);
    dealPlayer(deck);
    dealDealer(deck);

    setPlayerTurn(true);
    setMessage("Player's turn!");
    // };
   };

    
    const evalHands = () => {
      
      if (dealerHand.value > 21) {
        setMessage("Dealer busts!");
      } else if (playerHand.value > 21) {
        setMessage("Player busts!");
      } else {
        if (playerHand.value === 21 && playerHand.cards.length === 2 && dealerHand.value !== 21) {
          setMessage("Blackjack!");
        } else if (playerHand.value !== 21 && dealerHand.value === 21 && dealerHand.cards.length === 2) {
          setMessage("Dealer Blackjack!");
        } else if (playerHand.value > dealerHand.value) {
          setMessage("Player wins!");
          } else if (playerHand.value < dealerHand.value) {
            setMessage("Dealer wins!");
          } else {
            setMessage("Push!");
        }
      }
      setGameOver(true);
    };

    const endTurn = () => {
      if (playerTurn) {
        setDealerTurn(true);
        setPlayerTurn(false);
        setGameOver(false);
      } else {
        window.alert("It's not your turn!");
      }
    };

  return (
    <Container className="p-3">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Dealer's Cards</h1>
          <div className="d-flex justify-content-center">
          {dealerHand.cards.map(function(e) { 
            if (e.visible) {
              return (<td><Container className="card p-0">
             <img src={e.image} alt="" width="100" height="150"/>
              </Container></td>)
            } else {
              return (<td><Container className="card p-0">
              <img src='images/Back_Covers/Pomegranate.png' alt="" width='100' height='150' />
              </Container></td>)
              }})}
          </div>
          <div className="d-flex justify-content-center">{ dealerHand.value } </div>

      </Container>


      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Your Cards</h1>
          <div className="d-flex justify-content-center">
          {playerHand.cards.map( e => (<td><Container className="card p-0"> 
          <img src={e.image} alt="" width="100" height="150"/>
           </Container></td>))}
          </div>
          <div className="d-flex justify-content-center">{ playerHand.value }</div>
      </Container>


      <button type="button" className="btn btn-primary p-3 b-1"
        onClick={() => {newHand(newDeck())}}>Deal</button>

      <div className="d-flex justify-content-center">{ message }</div>

      <div className="d-flex justify-content-center">
        <div className="btn-group btn-group-lg p-3 b-1">
          <button type="button" className="btn btn-primary"
            onClick={() => {playerHit()}}>Hit</button>
          <button type="button" className="btn btn-primary"
            onClick={() => {endTurn()}}>Stand</button>
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
