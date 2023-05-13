import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container"; 
import deck from "./components/Deck";



function App() {
  const newDeck = () => {
    
	let newDeck = deck;

    // Fisher-Yates algorithm to shuffle the deck
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    };

    return shuffleArray(newDeck);
  };


  const [playerTurn, setPlayerTurn] = useState(null);
  const [gameOver, setGameOver] = useState(null);
  const [dealerTurn, setDealerTurn] = useState(null);
  const [playerHand, setPlayerHand] = useState({ cards: [], value: 0 });
  const [dealerHand, setDealerHand] = useState({ cards: [], value: 0 });
  const [message, setMessage] = useState("");

  useEffect(() => {
	setMessage(message);
  }, [message])

  useEffect(() => {
    recalculatePlayerHand();
	if (playerHand.value > 21) {
		setMessage("Player Busts!");
		setPlayerTurn(false);
		setGameOver(true);
	}
  }, [playerHand]);

  useEffect(() => {
    if (playerTurn && !gameOver) {
      dealerHand.cards[0].visible = false;
    } else if (!playerTurn && dealerTurn) {
      dealerHand.cards[0].visible = true;
    }
  }, [dealerHand.cards, dealerTurn, gameOver, playerTurn]);

//   useEffect(() => {
// 	if (dealerTurn) {

// 	}
//   }, [dealerTurn])

  useEffect(() => {
    setDealerHand(prev => ({...prev, value: recalculateDealerHand()}))
    if (dealerTurn) {
		setMessage("Dealer's Turn")
      	dealDealer(deck);
	}
  }, [dealerHand]);


  // Resets Hands and Deck
  const clearTable = () => {
    setPlayerHand((prev) => ({ ...prev, cards: [] }));
    setDealerHand((prev) => ({ ...prev, cards: [] }));
    // Create new deck
    // let freshDeck = newDeck();
    // setDeck({ ...freshDeck });
  };

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
    }
  };

  // Deal a card from the deck to the player
  const dealPlayer = (deck) => {
    let card = deck.shift();
    setPlayerHand((prev) => ({ cards: [...prev.cards, card] }));
    // let updatedDeck = deck;
    // setDeck(updatedDeck);
  };

  // Deal a card from the deck to the dealer
  const dealDealer = (deck) => {
	if (dealerHand.value < 17) {
		let card = deck.shift();
		if (playerTurn && dealerHand.length === 0) {
			card.visible = false;
		}
		setDealerHand((prev) => ({ cards: [...prev.cards, card] }));
		// let updatedDeck = deck;
		// setDeck(updatedDeck);
  	} else {
		evalHands();
	}
  };

  const recalculateDealerHand = () => {
    setDealerHand((prev) => ({ ...prev, value: 0 }));
    for (let i = 0; i < dealerHand.cards.length; i++) {
      if (dealerHand.cards[i].visible) {
        let cardVal = evalCard(dealerHand.cards[i]);
        setDealerHand((prev) => ({ ...prev, value: prev.value + cardVal }));
      }
    }
	return dealerHand.value;
  };

  const recalculatePlayerHand = () => {
    setPlayerHand((prev) => ({ ...prev, value: 0 }));
    for (let i = 0; i < playerHand.cards.length; i++) {
      let cardVal = evalCard(playerHand.cards[i]);
      setPlayerHand((prev) => ({ ...prev, value: prev.value + cardVal }));
    }
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
	setPlayerTurn(true);
    setDealerTurn(false);
	

    // Deal Cards
    dealPlayer(deck);
    console.log(deck);
    dealDealer(deck);
    console.log(deck);
    dealPlayer(deck);
    dealDealer(deck);

    
    setMessage("Player's turn!");
    // };
  };

  const evalHands = () => {
	setDealerTurn(false);
    if (dealerHand.value > 21) {
      setMessage("Dealer busts!");
    } else if (playerHand.value > 21) {
      setMessage("Player busts!");
    } else {
      if (
        playerHand.value === 21 &&
        playerHand.cards.length === 2 &&
        dealerHand.value !== 21
      ) {
        setMessage("Blackjack!");
      } else if (
        playerHand.value !== 21 &&
        dealerHand.value === 21 &&
        dealerHand.cards.length === 2
      ) {
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
      <Container className="p-5 mb-4 bg-secondary rounded-3">
        <h1 className="header">Dealer's Cards</h1>
        <div className="d-flex justify-content-center">
          {dealerHand.cards.map(function (e) {
            if (e.visible) {
              return (
                <td>
                  <Container className="card p-0">
                    <img src={e.image} alt="" width="100" height="150" />
                  </Container>
                </td>
              );
            } else {
              return (
                <td>
                  <Container className="card p-0">
                    <img
                      src="images/Back_Covers/Pomegranate.png"
                      alt=""
                      width="100"
                      height="150"
                    />
                  </Container>
                </td>
              );
            }
          })}
        </div>
        <div className="d-flex justify-content-center">{dealerHand.value} </div>
      </Container>

      <Container className="p-5 mb-4 bg-secondary rounded-3">
        <h1 className="header">Your Cards</h1>
        <div className="d-flex justify-content-center">
          {playerHand.cards.map((e) => (
            <td>
              <Container className="card p-0">
                <img src={e.image} alt="" width="100" height="150" />
              </Container>
            </td>
          ))}
        </div>
        <div className="d-flex justify-content-center">{playerHand.value}</div>
      </Container>

      <button
        type="button"
        className="btn btn-primary p-3 b-1"
        onClick={() => {
          newHand(newDeck());
        }}
      >
        Deal
      </button>

      <div className="d-flex justify-content-center">
        <h3 className="header">{message}</h3>
      </div>

      <div className="d-flex justify-content-center">
        <div className="btn-group btn-group-lg p-3 b-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              playerHit();
            }}
          >
            Hit
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              endTurn();
            }}
          >
            Stand
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => console.log("double")}
          >
            Double
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => console.log("split")}
          >
            Split
          </button>
        </div>
      </div>
    </Container>
  );
}

export default App;
